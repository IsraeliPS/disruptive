create database if not exists Disruptive;

use Disruptive;

create table users(
	userId varchar (36) primary key not null,
    username varchar(30) not null unique,
    email varchar(50) not null unique,
    password varchar(80) not null,
    role varchar(12) not null unique
);

create table tematicas(
	tematicaId varchar (36) primary key not null,
    concept varchar (30) not null unique,
    linkImageCategory varchar(200) not null,
    images boolean default false,
    videos boolean default false,
    texto boolean default false,
    createdBy varchar (36) not null
);

create table elements(
    elementId varchar (36) primary key not null,
    concept varchar (30) not null,
    link varchar (200) not null,
    typeElement varchar(10)not null,
    userId varchar (36) not null,
    CONSTRAINT FK_elementUser foreign key (userId) references User(userId),
    tematicaId varchar (36) not null,
    CONSTRAINT FK_elementTematica foreign key (tematicaId) references Tematicas(tematicaId)
);

describe User;
describe Tematicas;
describe Element;