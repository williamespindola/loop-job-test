
create database loop_client;

CREATE TABLE `client` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uuid` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `phone` char(11) NOT NULL,
  `birth_date` date NOT NULL,
  `zip` char(8) NOT NULL,
  `address` varchar(50) NOT NULL,
  `complement` varchar(50) DEFAULT NULL,
  `neighborhood` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `state` char(2) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;
