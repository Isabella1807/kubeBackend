-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Vært: mysql
-- Genereringstid: 19. 12 2024 kl. 23:52:59
-- Serverversion: 8.4.2
-- PHP-version: 8.2.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kubeprojekt`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `project`
--

CREATE TABLE `project` (
  `projectId` int NOT NULL,
  `templateId` int NOT NULL,
  `userId` int NOT NULL,
  `stackId` int NOT NULL,
  `projectName` varchar(250) NOT NULL,
  `createdDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subdomainName` varchar(250) NOT NULL,
  `lastChangeDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `state` tinyint(1) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `project`
--

INSERT INTO `project` (`projectId`, `templateId`, `userId`, `stackId`, `projectName`, `createdDate`, `subdomainName`, `lastChangeDate`, `state`) VALUES
(80, 6, 12, 793, 'studentProject', '2024-12-19 23:38:53', 'studentProject', '2024-12-19 23:38:53', 1),
(81, 6, 13, 795, 'FacultyProject', '2024-12-19 23:40:10', 'FacultyProject', '2024-12-19 23:40:10', 1),
(83, 7, 14, 797, 'AdminProject', '2024-12-19 23:42:11', 'AdminProject', '2024-12-19 23:42:11', 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `role`
--

CREATE TABLE `role` (
  `roleId` int NOT NULL,
  `roleName` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `role`
--

INSERT INTO `role` (`roleId`, `roleName`) VALUES
(1, 'admin'),
(2, 'faculty'),
(3, 'student');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `team`
--

CREATE TABLE `team` (
  `teamId` int NOT NULL,
  `teamName` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `team`
--

INSERT INTO `team` (`teamId`, `teamName`) VALUES
(5, 'WUOE24'),
(6, 'Faculty'),
(7, 'Admin');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `template`
--

CREATE TABLE `template` (
  `templateId` int NOT NULL,
  `templateText` text NOT NULL,
  `templateName` varchar(250) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `template`
--

INSERT INTO `template` (`templateId`, `templateText`, `templateName`) VALUES
(6, 'networks:\r\n  traefik-proxy:\r\n    external: true\r\n  wp-network:\r\n    driver: overlay\r\n\r\nservices:\r\n  wordpress:\r\n    image: wordpress:latest\r\n    environment:\r\n      WORDPRESS_DB_HOST: db\r\n      WORDPRESS_DB_USER: wpuser\r\n      WORDPRESS_DB_PASSWORD: wppassword\r\n      WORDPRESS_DB_NAME: wpdatabase\r\n    networks:\r\n      - traefik-proxy\r\n      - wp-network\r\n    deploy:\r\n      labels:\r\n        - traefik.enable=true\r\n        - traefik.http.routers.CHANGEME01.rule=Host(`SUBDOMAIN01.kubelab.dk`)\r\n        - traefik.http.routers.CHANGEME01.entrypoints=web,websecure\r\n        - traefik.http.routers.CHANGEME01.tls.certresolver=letsencrypt\r\n        - traefik.http.services.CHANGEME01.loadbalancer.server.port=80\r\n\r\n  db:\r\n    image: mariadb:latest\r\n    environment:\r\n      MYSQL_ROOT_PASSWORD: rootpassword\r\n      MYSQL_DATABASE: wpdatabase\r\n      MYSQL_USER: wpuser\r\n      MYSQL_PASSWORD: wppassword\r\n    networks:\r\n      - wp-network\r\n\r\n  phpmyadmin:\r\n    image: phpmyadmin:latest\r\n    environment:\r\n      PMA_HOST: db\r\n      PMA_USER: wpuser\r\n      PMA_PASSWORD: wppassword\r\n    networks:\r\n      - traefik-proxy\r\n      - wp-network\r\n    deploy:\r\n      labels:\r\n        - traefik.enable=true\r\n        - traefik.http.routers.CHANGEME02.rule=Host(`SUBDOMAIN02.kubelab.dk`)\r\n        - traefik.http.routers.CHANGEME02.entrypoints=web,websecure\r\n        - traefik.http.routers.CHANGEME02.tls.certresolver=letsencrypt\r\n        - traefik.http.services.CHANGEME02.loadbalancer.server.port=80', 'Wordpress'),
(7, 'networks:\r\n  traefik-proxy:\r\n    external: true\r\n\r\nservices:\r\n  test:\r\n    image: nginx:latest\r\n    networks:\r\n      - traefik-proxy\r\n    deploy:\r\n      labels:\r\n        - traefik.enable=true\r\n        - traefik.http.routers.CHANGEME.rule=Host(`SUBDOMAIN.kubelab.dk`)\r\n        - traefik.http.routers.CHANGEME.entrypoints=web,websecure\r\n        - traefik.http.routers.CHANGEME.tls.certresolver=letsencrypt\r\n        - traefik.http.services.CHANGEME.loadbalancer.server.port=80', 'Nginx');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `userId` int NOT NULL,
  `uclMail` varchar(250) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  `password` varchar(250) NOT NULL,
  `firstName` varchar(250) NOT NULL,
  `lastName` varchar(250) NOT NULL,
  `roleId` int NOT NULL,
  `teamId` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`userId`, `uclMail`, `password`, `firstName`, `lastName`, `roleId`, `teamId`) VALUES
(12, 'student@edu.ucl.dk', '123', 'StudentFirstName', 'StudentLastName', 3, 5),
(13, 'teacher@ucl.dk', '123', 'TeacherFirstName', 'TeacherLastName', 2, 6),
(14, 'admin@ucl.dk', '123', 'AdminFirstName', 'AdminLastName', 1, 7);

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `project`
--
ALTER TABLE `project`
  ADD PRIMARY KEY (`projectId`),
  ADD KEY `templateId` (`templateId`),
  ADD KEY `userId` (`userId`);

--
-- Indeks for tabel `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`roleId`);

--
-- Indeks for tabel `team`
--
ALTER TABLE `team`
  ADD PRIMARY KEY (`teamId`);

--
-- Indeks for tabel `template`
--
ALTER TABLE `template`
  ADD PRIMARY KEY (`templateId`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD KEY `roleId` (`roleId`),
  ADD KEY `teamId` (`teamId`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `project`
--
ALTER TABLE `project`
  MODIFY `projectId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=84;

--
-- Tilføj AUTO_INCREMENT i tabel `role`
--
ALTER TABLE `role`
  MODIFY `roleId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Tilføj AUTO_INCREMENT i tabel `team`
--
ALTER TABLE `team`
  MODIFY `teamId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- Tilføj AUTO_INCREMENT i tabel `template`
--
ALTER TABLE `template`
  MODIFY `templateId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `userId` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=28;

--
-- Begrænsninger for dumpede tabeller
--

--
-- Begrænsninger for tabel `project`
--
ALTER TABLE `project`
  ADD CONSTRAINT `project_ibfk_1` FOREIGN KEY (`templateId`) REFERENCES `template` (`templateId`),
  ADD CONSTRAINT `project_ibfk_2` FOREIGN KEY (`userId`) REFERENCES `users` (`userId`);

--
-- Begrænsninger for tabel `users`
--
ALTER TABLE `users`
  ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`),
  ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`teamId`) REFERENCES `team` (`teamId`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
