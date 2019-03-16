/**
 * randomId function is from the discussion on this stackoverflow link
 * https://stackoverflow.com/questions/1349404/generate-random-string-characters-in-javascript
 * the function is modified here to generate 15 length character id for our data base
 */
const randomId = () => {
  let id = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let index = 0; index < 15; index += 1) {
    id += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return id;
};

export default randomId;
