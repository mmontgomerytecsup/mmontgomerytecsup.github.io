-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 28-05-2025 a las 05:53:03
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `cloud`
--

DELIMITER $$
--
-- Procedimientos
--
CREATE DEFINER=`root`@`localhost` PROCEDURE `login_user` (IN `p_username` VARCHAR(255), IN `p_password` VARCHAR(255))   BEGIN
    SELECT 
        id,
        username,
        state
    FROM user
    WHERE 
        username = p_username
        AND password_hash = p_password
        AND state = 1
    LIMIT 1;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_activate_user` (IN `p_user_id` INT, IN `p_modified_by` VARCHAR(100))   BEGIN
    UPDATE user
    SET
        state = 1,
        modified_by = p_modified_by,
        modified_at = CURRENT_TIMESTAMP
    WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_delete_user` (IN `p_user_id` INT, IN `p_modified_by` VARCHAR(100))   BEGIN
    UPDATE user
    SET
        state = 3,
        modified_by = p_modified_by,
        modified_at = CURRENT_TIMESTAMP
    WHERE id = p_user_id;
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_insert_user` (IN `p_email` VARCHAR(255), IN `p_password_hash` VARCHAR(255), IN `p_username` VARCHAR(255), IN `p_created_by` VARCHAR(100))   BEGIN
    INSERT INTO user (
        email,
        password_hash,
        username,
        created_by
    ) VALUES (
        p_email,
        p_password_hash,
        p_username,
        p_created_by
    );
END$$

CREATE DEFINER=`root`@`localhost` PROCEDURE `sp_update_user` (IN `p_user_id` INT, IN `p_email` VARCHAR(255), IN `p_username` VARCHAR(255), IN `p_modified_by` VARCHAR(100))   BEGIN
    UPDATE user
    SET
        email = p_email,
        username = p_username,
        modified_by = p_modified_by,
        modified_at = CURRENT_TIMESTAMP
    WHERE id = p_user_id;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `state_type`
--

CREATE TABLE `state_type` (
  `id` tinyint(4) NOT NULL,
  `description` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `state_type`
--

INSERT INTO `state_type` (`id`, `description`) VALUES
(0, 'Inactivo'),
(1, 'Activo'),
(2, 'Bloqueado'),
(3, 'Eliminado'),
(4, 'Suspendido temporalmente'),
(5, 'Suspendido permanentemente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `user`
--

CREATE TABLE `user` (
  `id` int(11) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password_hash` varchar(255) NOT NULL,
  `username` varchar(255) NOT NULL,
  `created_at` datetime DEFAULT current_timestamp(),
  `created_by` varchar(100) DEFAULT NULL,
  `modified_at` datetime DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `modified_by` varchar(100) DEFAULT NULL,
  `state` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `user`
--

INSERT INTO `user` (`id`, `email`, `password_hash`, `username`, `created_at`, `created_by`, `modified_at`, `modified_by`, `state`) VALUES
(1, 'test@test.com', 'aaa', 'mike', '2025-05-21 19:43:56', 'system', '2025-05-27 18:44:13', NULL, 1);

-- --------------------------------------------------------

--
-- Estructura Stand-in para la vista `view_users_with_state`
-- (Véase abajo para la vista actual)
--
CREATE TABLE `view_users_with_state` (
`id` int(11)
,`email` varchar(255)
,`username` varchar(255)
,`created_at` datetime
,`created_by` varchar(100)
,`modified_at` datetime
,`modified_by` varchar(100)
,`state` tinyint(4)
,`state_description` varchar(100)
);

-- --------------------------------------------------------

--
-- Estructura para la vista `view_users_with_state`
--
DROP TABLE IF EXISTS `view_users_with_state`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `view_users_with_state`  AS SELECT `u`.`id` AS `id`, `u`.`email` AS `email`, `u`.`username` AS `username`, `u`.`created_at` AS `created_at`, `u`.`created_by` AS `created_by`, `u`.`modified_at` AS `modified_at`, `u`.`modified_by` AS `modified_by`, `u`.`state` AS `state`, `st`.`description` AS `state_description` FROM (`user` `u` join `state_type` `st` on(`u`.`state` = `st`.`id`)) ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `state_type`
--
ALTER TABLE `state_type`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `username` (`username`),
  ADD KEY `state` (`state`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `user`
--
ALTER TABLE `user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`state`) REFERENCES `state_type` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
