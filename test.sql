-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Мар 15 2021 г., 21:27
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
  `name` varchar(500) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL,
  `extension` tinytext NOT NULL,
  `mime-type` tinytext NOT NULL,
  `size` tinytext NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Дамп данных таблицы `files`
--

INSERT INTO `files` (`id`, `name`, `extension`, `mime-type`, `size`, `date`) VALUES
(11, '1615824755181-about-33.jpg', 'jpg', 'image/jpeg', '375849', '2021-03-15'),
(12, '1615824894348-about-22.jpg', 'jpg', 'image/jpeg', '249648', '2021-03-15');

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
('alex2@list.com', '$2a$15$MQIrUegt2MwM5C1XsLzriex6lOWWjFZTWYsdaN/bk355XKI4vULKC'),
('alex4@list.com', '$2a$15$4pMkc.eMYqJhNE0RGoISkewwwGbRbYwn82yZIHXYSU36gRQ8HKF4S'),
('alex5@list.com', '$2a$15$G6MQoD0Gir/tlsSxBFk.ueKHhUAewpVsOj7JMd5tuS4BksO4GLpuK'),
('alex@list.com', '$2a$15$NsK83T717h72cA3KGozWoe7igCp.4j0W4vb.TLUUKi9Te2poTTuI6'),
('alexmax@list.com', '$2a$15$Jt5C6/j7lYc8cvxFSmXPN.u3Y96HY66sq2pxXjm7DPyHq1uzPxciy');

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
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
