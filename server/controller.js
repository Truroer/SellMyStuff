const createTableAds = () => {
  return `CREATE TABLE IF NOT EXISTS ads (
    price int, 
    title varchar(80), 
    date bigint,
    username varchar(80), 
    description varchar(80), 
    pictureName varchar(80),
    lat float, 
    lon float, 
    country varchar(80), 
    city varchar(80), 
    postcode int, 
    road varchar(80), 
    house_number int,
    length int, 
    width int, 
    height int, 
    weight int
  )`;
};

const insertAd = (
  price,
  title,
  date,
  username,
  description,
  pictureName,
  lat,
  lon,
  country,
  city,
  postcode,
  road,
  house_number,
  length,
  width,
  height,
  weight
) => {
  return `INSERT INTO ads VALUES (
    ${price}, 
    '${title}', 
    ${date},
    '${username}', 
    '${description}', 
    '${pictureName}',
    ${lat}, 
    ${lon}, 
    '${country}', 
    '${city}', 
    ${postcode}, 
    '${road}', 
    ${house_number},
    ${length}, 
    ${width}, 
    ${height}, 
    ${weight}
  )`;
};

const deleteAd = date => {
  return `DELETE FROM ads WHERE date = '${date}'`;
};

const getAllAds = () => {
  return `SELECT * FROM ads`;
};

const deleteTable = table => {
  return `DROP TABLE ${table}`;
};

module.exports = {
  getAllAds,
  deleteTable,
  insertAd,
  createTableAds,
  deleteAd
};
