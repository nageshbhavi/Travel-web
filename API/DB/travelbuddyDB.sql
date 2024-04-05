create database travelbuddy;

use travelbuddy;

CREATE TABLE userlogin (
    USER_NAME VARCHAR(20),
    EMAIL_ID VARCHAR(30) PRIMARY KEY NOT NULL,
    PASS_WD VARCHAR(200) NOT NULL
);

drop table userlogin;

select * from userlogin;

truncate table userlogin;