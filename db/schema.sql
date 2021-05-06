-- MySQL schema plan

DROP DATABASE IF EXISTS QA;

CREATE DATABASE QA;

USE QA;

CREATE TABLE questions (
  id integer NOT NULL AUTO_INCREMENT,
  product_id integer NOT NULL,
  question varchar(255),
  datePosted timestamp,
  asker varchar(50),
  email varchar(40),
  reported boolean NOT NULL DEFAULT false,
  question_helpfulness integer DEFAULT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE answers (
  answer_id integer NOT NULL AUTO_INCREMENT,
  question_id integer NOT NULL,
  answer varchar(255),
  datePosted timestamp DEFAULT CURRENT_TIMESTAMP,
  answerer varchar(50),
  email varchar(40),
  reported boolean NOT NULL DEFAULT false,
  answer_helpfulness integer DEFAULT NULL,
  PRIMARY KEY (answer_id),
  FOREIGN KEY (question_id) REFERENCES questions (id)
);

CREATE TABLE answerPhotos(
  id integer NOT NULL AUTO_INCREMENT,
  answer_id integer,
  link varchar(255),
  PRIMARY KEY (id),
  FOREIGN KEY (answer_id) REFERENCES answers (answer_id)
);

LOAD DATA LOCAL INFILE '/Users/mrcruz/HackReactor/SDC-CSV/questionsTest.csv'
INTO TABLE questions
FIELDS TERMINATED BY ','
OPTIONALLY ENCLOSED BY '"'
LINES TERMINATED BY '\n'
IGNORE 1 LINES
(id, product_id, question, @date, asker, email, reported, question_helpfulness)
  SET datePosted = FROM_UNIXTIME(@date/1000);

SHOW WARNINGS;

DELETE FROM questions WHERE question_helpfulness IS NULL;

-- LOAD DATA LOCAL INFILE '/Users/mrcruz/HackReactor/SDC-CSV/answerTest.csv'
-- INTO TABLE answers
-- FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 LINES
-- (answer_id, question_id, answer, @date, answerer, email, reported, answer_helpfulness)
-- SET datePosted = FROM_UNIXTIME(@date/1000);

-- SHOW WARNINGS;

-- LOAD DATA LOCAL INFILE '/Users/mrcruz/HackReactor/SDC-CSV/photoTest.csv'
-- INTO TABLE answerPhotos
-- FIELDS TERMINATED BY ','
-- OPTIONALLY ENCLOSED BY '"'
-- LINES TERMINATED BY '\n'
-- IGNORE 1 LINES