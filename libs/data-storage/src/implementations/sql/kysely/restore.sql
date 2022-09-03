DROP DATABASE lenotes;
CREATE DATABASE lenotes;

\connect lenotes

DROP TABLE groups;
DROP TABLE notes;

CREATE TABLE groups(
	PRIMARY KEY(group_id),
	group_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
	(MINVALUE 0 START WITH 0 INCREMENT BY 1),
	name VARCHAR(48),
	is_trashed BOOLEAN
);

CREATE TABLE notes( 
	PRIMARY KEY(note_id),
	note_id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY
	(MINVALUE 0 START WITH 0 INCREMENT BY 1),
	name VARCHAR(48),
	content TEXT,
	is_trashed BOOLEAN,
	group_id BIGINT REFERENCES groups(group_id) ON DELETE CASCADE NOT NULL
);

INSERT INTO
	groups (name, is_trashed)
VALUES
	('group A', false),
	('group B', false),
	('group C', true);

INSERT INTO
	notes (name, content, group_id, is_trashed)
VALUES
	('note 1', 'content 1', 0, false),
	('note 2', 'content 2', 1, false),
	('note 3', 'content 3', 2, true),
	('note 4', 'content 4', 1, true),
	('note 5', 'content 5', 0, true),
	('note 6', 'content 6', 1, false),
	('note 7', 'content 7', 1, true),
  ('note 8', 'content 8', 2, true),
	('note 9', 'content 9', 2, true),
	('note 10', 'content 10', 0, false);