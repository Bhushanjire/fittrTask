-- phpMyAdmin SQL Dump
-- version 5.0.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Sep 05, 2020 at 11:34 AM
-- Server version: 10.4.14-MariaDB
-- PHP Version: 7.4.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `fittr`
--

-- --------------------------------------------------------

--
-- Table structure for table `appliedPromCode`
--

CREATE TABLE `appliedPromCode` (
  `appliedId` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `promoCodeId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `appliedPromCode`
--

INSERT INTO `appliedPromCode` (`appliedId`, `userId`, `promoCodeId`, `createdAt`, `updatedAt`) VALUES
(5, 2, 5, '2020-09-05 13:05:48', '2020-09-05 13:05:48'),
(6, 2, 12, '2020-09-05 14:28:46', '2020-09-05 14:28:46'),
(8, 3, 12, '2020-09-05 14:32:10', '2020-09-05 14:32:10');

-- --------------------------------------------------------

--
-- Table structure for table `promocode`
--

CREATE TABLE `promocode` (
  `codeId` int(11) NOT NULL,
  `codeName` varchar(250) NOT NULL,
  `startDate` date NOT NULL,
  `endDate` date NOT NULL,
  `discount` int(11) NOT NULL DEFAULT 0,
  `status` enum('Active','Inactive') NOT NULL DEFAULT 'Active',
  `age` int(11) DEFAULT NULL,
  `gender` varchar(15) DEFAULT NULL,
  `region` varchar(150) DEFAULT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `promocode`
--

INSERT INTO `promocode` (`codeId`, `codeName`, `startDate`, `endDate`, `discount`, `status`, `age`, `gender`, `region`, `createdAt`, `updatedAt`) VALUES
(6, 'AMENR1HOLT2', '2020-09-01', '2020-09-10', 10, 'Inactive', 30, 'Female', 'South', '2020-09-04 12:20:34', '2020-09-04 12:20:34'),
(9, 'ALESE2TW1M', '2020-09-05', '2020-09-08', 15, 'Active', 21, 'Male', 'West', '2020-09-05 13:55:00', '2020-09-05 13:55:00'),
(10, 'TMORAE26EAHLTNS', '2020-09-06', '2020-09-19', 1, 'Active', 26, 'Male', 'Northeast', '2020-09-05 13:55:51', '2020-09-05 13:55:51'),
(11, '0AENMRHO3TL', '2020-09-05', '2020-09-06', 10, 'Active', 30, 'Male', 'North', '2020-09-05 14:23:45', '2020-09-05 14:23:45'),
(12, '31AULOHMTES', '2020-09-05', '2020-09-04', 5, 'Active', 31, 'Male', 'South', '2020-09-05 14:27:49', '2020-09-05 14:27:49');

-- --------------------------------------------------------

--
-- Table structure for table `roles`
--

CREATE TABLE `roles` (
  `roleId` int(11) NOT NULL,
  `roleName` varchar(150) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `roles`
--

INSERT INTO `roles` (`roleId`, `roleName`) VALUES
(1, 'Admin'),
(2, 'Customer');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `userId` int(11) NOT NULL,
  `firstName` varchar(100) DEFAULT NULL,
  `lastName` varchar(100) DEFAULT NULL,
  `emailId` varchar(250) NOT NULL,
  `password` varchar(250) DEFAULT NULL,
  `gender` enum('Male','Female') NOT NULL,
  `age` int(11) NOT NULL,
  `region` varchar(50) NOT NULL,
  `roleId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL DEFAULT current_timestamp(),
  `updatedAt` datetime NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`userId`, `firstName`, `lastName`, `emailId`, `password`, `gender`, `age`, `region`, `roleId`, `createdAt`, `updatedAt`) VALUES
(1, 'Bhushan', 'Jire', 'bhushanjire@gmail.com', '514ea12a6cf81062ed363647cd1ee444', 'Male', 30, 'North', 1, '2020-09-03 12:16:09', '2020-09-03 12:16:09'),
(2, 'Amol', 'Patel', 'amolpatel@gmail.com', 'ad931a0ed1f66c4be7107191ea01c213', 'Male', 31, 'South', 2, '2020-09-03 12:18:07', '2020-09-03 12:18:07'),
(3, 'Manoj', 'Kumar', 'manoj@gmail.com', '211c3cb3943fddebb20a93cc23b77577', 'Male', 31, 'South', 2, '2020-09-05 14:30:04', '2020-09-05 14:30:04');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appliedPromCode`
--
ALTER TABLE `appliedPromCode`
  ADD PRIMARY KEY (`appliedId`);

--
-- Indexes for table `promocode`
--
ALTER TABLE `promocode`
  ADD PRIMARY KEY (`codeId`);

--
-- Indexes for table `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`roleId`),
  ADD UNIQUE KEY `roleName` (`roleName`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`userId`),
  ADD UNIQUE KEY `EmailIndex` (`emailId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appliedPromCode`
--
ALTER TABLE `appliedPromCode`
  MODIFY `appliedId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `promocode`
--
ALTER TABLE `promocode`
  MODIFY `codeId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `roles`
--
ALTER TABLE `roles`
  MODIFY `roleId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `userId` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
