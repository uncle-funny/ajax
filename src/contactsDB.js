const RECORDS = {};
let lastIndex = -1;

function _validate(record) {
  if (!record.firstName) {
    throw new Error('First name is not defined');
  }
  
  if (!record.phone) {
    throw new Error('Mobile phone is not defined');
  }

  if (record.birthDate && typeof record.birthDate !== 'number') {
    throw new Error('Birth date is not correct');
  }
}
  
function _removeByIndex(index) {
  delete RECORDS[index];
  return RECORDS
}

function create(record) {
  _validate(record);
  
  lastIndex++;
  RECORDS[lastIndex] = record;
}

function getAll() {
  return RECORDS;
}
  
function find(prediction) {
  const keys = Object.keys(prediction);
  const indexes = Object.keys(RECORDS);

  const foundIndexes = indexes.filter(index => {
    const record = RECORDS[index];
    return keys.every(key => record[key].includes(prediction[key]));
  });

  return foundIndexes.reduce((acc, index) => {
    acc[index] = RECORDS[index];
    return acc;
  }, {});
}

function update(index, updatedData) {
  const keys = Object.keys(updatedData);
  const record = RECORDS[index];
  
  keys.forEach(key => {
    record[key] = updatedData[key];
  });
}

// data: number | number[]
function remove(data) {
  if (typeof data === 'number') {
    _removeByIndex(data);
  } else if (Array.isArray(data)) {
    data.forEach(index => {
      _removeByIndex(index);
    });
  }
}
remove(0)
module.exports = { // CRUD opeartions
  create,
  getAll,
  find,
  update,
  remove,
};
