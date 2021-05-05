-- MySQL schema plan

DROP DATABASE IF EXISTS QA;

CREATE DATABASE QA;

USE QA;

CREATE TABLE question (
  id integer NOT NULL AUTO_INCREMENT,
  product_id integer NOT NULL,
  question varchar(255),
  datePosted timestamp,
  asker varchar(50),
  email varchar(40),
  reported boolean NOT NULL DEFAULT false,
  question_helpfulness integer NOT NULL DEFAULT 0,
  PRIMARY KEY (id)
);

CREATE TABLE answer (
  answer_id integer NOT NULL AUTO_INCREMENT,
  question_id integer NOT NULL,
  answer varchar(255),
  datePosted timestamp,
  answerer varchar(50),
  email varchar(40),
  reported boolean NOT NULL DEFAULT false,
  answer_helpfulness integer NOT NULL DEFAULT 0,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_id) REFERENCES question (id)
);

CREATE TABLE answerPhotos(
  id integer NOT NULL AUTO_INCREMENT,
  answer_id integer,
  link varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answer (answer_id)
);

LOAD DATA LOCAL INFILE '/Users/mrcruz/HackReactor/SDC-CSV/questionTest.csv'
INTO TABLE question
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, product_id, question, @date, asker, email, reported, question_helpfulness)
  SET datePosted = FROM_UNIXTIME(@date/1000);