/**
 * create groups table
 */
const groupsTable = async () => {
  const groupQuery = `CREATE TABLE IF NOT EXISTS 
      groups(
        id SERIAL PRIMARY KEY,
        name VARCHAR(128) UNIQUE NOT NULL,
        description VARCHAR(500) NOT NULL,
        ownerId VARCHAR(128) NOT NULL
      )`;
  console.log('about to table create');
  await pool.query(groupQuery, (res) => {
    console.log(res);
  });
};

/**
 * drop groups table
 */
const dropGroupsTable = async () => {
  const dropGroupsQuery = 'DROP TABLE IF EXISTS groups';
  await pool.query(dropGroupsQuery, (res) =>{
    console.log(res);
  });
};

/**
 * create group members table
 */
const groupMembersTable = async () => {
  const groupMembersQuery = `CREATE TABLE IF NOT EXISTS 
      groupmembers(
        id UUID PRIMARY KEY,
        groupId VARCHAR(128) UNIQUE NOT NULL,
        groupName VARCHAR(128) UNIQUE NOT NULL,
        memberId VARCHAR(128) UNIQUE NOT NULL
      )`;
  console.log('about to table create');
  await pool.query(groupMembersQuery, (res) => {
    console.log(res);
  });
};

/**
 * drop group members
 */
const dropGroupMembersTable = async () => {
  const dropGroupMembersQuery = 'DROP TABLE IF EXISTS groupmembers';
  await pool.query(dropGroupMembersQuery, (res) => {
    console.log(res);
  });
};

/**
 * create group messages tables
 */
const groupMessagesTable = async () => {
  const groupMessagesQuery = `CREATE TABLE IF NOT EXISTS
      groupmessages(
        id SERIAL PRIMARY KEY,
        ownerId VARCHAR(128) UNIQUE NOT NULL,
        groupName VARCHAR(128) UNIQUE NOT NULL,
        message TEXT NOT NULL,
        parrentMessageId SERIAL,
        FOREIGN KEY (groupName) REFERENCES groups (name)
      )`;
  console.log('about to table create');
  await pool.query(groupMessagesQuery, (res) => {
    console.log(res);
  });
};


/**
 * drop group messages tables
 */
const dropGroupMessage = async () => {
  const dropgroupMessageQuery = 'DROP TABLE IF EXISTS groupmessages';
  await pool.query(dropgroupMessageQuery, (res) => {
    console.log(res);
  });
};