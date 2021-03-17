-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 17 2021 г., 21:30
-- Версия сервера: 8.0.19
-- Версия PHP: 7.1.33

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `test`
--

-- --------------------------------------------------------

--
-- Структура таблицы `files`
--

CREATE TABLE `files` (
  `id` int NOT NULL,
  `name` text CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `extension` tinytext NOT NULL,
  `mime-type` tinytext NOT NULL,
  `size` tinytext NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `files`
--

INSERT INTO `files` (`id`, `name`, `extension`, `mime-type`, `size`, `date`) VALUES
(15, '1615918663517-about-33.jpg', 'jpg', 'image/jpeg', '375849', '2021-03-16'),
(18, '1615918256113-about-22.jpg', 'jpg', 'image/jpeg', '249648', '2021-03-16'),
(19, '1615918262668-about-11.jpg', 'jpg', 'image/jpeg', '612359', '2021-03-16'),
(20, '1615999670896-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(21, '1615999671819-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(22, '1615999672474-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(23, '1615999673004-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(24, '1615999673483-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(25, '1615999674013-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(26, '1615999674483-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(27, '1615999674983-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(28, '1615999675415-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(29, '1615999675978-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(30, '1615999676436-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(31, '1615999676905-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(32, '1615999677375-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(33, '1615999677883-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(34, '1615999678304-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(35, '1615999678758-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(36, '1615999679224-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(37, '1615999679731-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(38, '1615999680140-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(39, '1615999680768-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(40, '1615999681079-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(41, '1615999681633-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(42, '1615999682135-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(43, '1615999682621-test.txt', 'txt', 'text/plain', '4', '2021-03-17'),
(44, '1615999683035-test.txt', 'txt', 'text/plain', '4', '2021-03-17');

-- --------------------------------------------------------

--
-- Структура таблицы `users`
--

CREATE TABLE `users` (
  `id` varchar(255) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `password` varchar(100) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `users`
--

INSERT INTO `users` (`id`, `password`) VALUES
('+7954-44-777-11', '$2a$15$WuTePzwna6ucOxS7l6y5IeTNEAydyO2LVbAh78tj9ExIM1WbmfZ9a'),
('+79617772169', '$2a$15$u.wY2b6zGOJ1OGi9XhHlIut8TunwSkfqRi.4UVRHMdVRsTDFWdTaK'),
('afra@kel.com', '$2a$15$uG9ZDMaO/Gu8T/wMY4Hgn./8YBFXnECNhSpE/.8ThrTuOxmIiA4h2'),
('alex2@list.com', '$2a$15$MQIrUegt2MwM5C1XsLzriex6lOWWjFZTWYsdaN/bk355XKI4vULKC'),
('alex4@list.com', '$2a$15$4pMkc.eMYqJhNE0RGoISkewwwGbRbYwn82yZIHXYSU36gRQ8HKF4S'),
('alex5@list.com', '$2a$15$G6MQoD0Gir/tlsSxBFk.ueKHhUAewpVsOj7JMd5tuS4BksO4GLpuK'),
('alex@list.com', '$2a$15$NsK83T717h72cA3KGozWoe7igCp.4j0W4vb.TLUUKi9Te2poTTuI6'),
('alexmax@list.com', '$2a$15$Jt5C6/j7lYc8cvxFSmXPN.u3Y96HY66sq2pxXjm7DPyHq1uzPxciy'),
('blackcat@list.com', '$2a$15$uPNeM7xLimWTyBYpOsrGaOtPm7fFrYW98I69vxA8ouM2eK8XBXpTW'),
('cat@list.com', '$2a$15$Fh93l7Qy7kcbRKfuGS8xtOa9200D2ATilYMVYx2IDhgc6ckVo2eqG');

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `files`
--
ALTER TABLE `files`
  ADD UNIQUE KEY `id` (`id`);

--
-- Индексы таблицы `users`
--
ALTER TABLE `users`
  ADD UNIQUE KEY `id` (`id`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `files`
--
ALTER TABLE `files`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=45;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
