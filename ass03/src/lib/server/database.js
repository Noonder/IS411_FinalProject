
import crypto from 'crypto';

const db = {
  waterRecords: new Map(),
  toolsRecords: new Map(),
  soilRecords: new Map(),
  postRecords: new Map(),
  harvestRecords: new Map(), 
  fertilizerRecords: new Map(),
  facilitiesRecords: new Map(),
  personal : new Map()
};



export function getWaterRecords(userid) {
  if (!db.waterRecords.has(userid)) db.waterRecords.set(userid, []);
  return db.waterRecords.get(userid);
}

export function createWaterRecord(userid, record) {
  const records = db.waterRecords.get(userid) || [];
  records.push(record);
  db.waterRecords.set(userid, records);
  return record;
}

export function resetWaterRecords(userid) {
  db.waterRecords.set(userid, []);
}

export function getToolsRecords(userid) {
  if (!db.toolsRecords.has(userid)) db.toolsRecords.set(userid, []);
  return db.toolsRecords.get(userid);
}

export function createToolsRecord(userid, record) {
  const records = db.toolsRecords.get(userid) || [];
  records.push(record)
  db.toolsRecords.set(userid, records);
  return record;
}

export function resetToolsRecords(userid) {
  db.toolsRecords.set(userid, []);
}

export function getSoilRecords(userid) {
  if (!db.soilRecords.has(userid)) db.soilRecords.set(userid, []);
  return db.soilRecords.get(userid);
}

export function createSoilRecord(userid, record) {
  const records = db.soilRecords.get(userid) || [];
  records.push(record);
  db.soilRecords.set(userid, records);
  return record;
}

export function resetSoilRecords(userid) {
  db.soilRecords.set(userid, []);
}

export function getPostRecords(userid) {
  if (!db.postRecords.has(userid)) db.postRecords.set(userid, []);
  return db.postRecords.get(userid);
}

export function createPostRecord(userid, record) {
  const records = db.postRecords.get(userid) || [];
  records.push(record);
  db.postRecords.set(userid, records);
  return record;
}

export function resetPostRecords(userid) {
  db.postRecords.set(userid, []);
}

export function getHarvestRecords(userid) {
  if (!db.harvestRecords.has(userid)) db.harvestRecords.set(userid, []);
  return db.harvestRecords.get(userid);
}

export function createHarvestRecord(userid, record) {
  const records = db.harvestRecords.get(userid) || [];
  records.push(record);
  db.harvestRecords.set(userid, records);
  return record;
}

export function resetHarvestRecords(userid) {
  db.harvestRecords.set(userid, []);
}

export function getFertilizerRecords(userid) {
  if (!db.fertilizerRecords.has(userid)) db.fertilizerRecords.set(userid, []);
  return db.fertilizerRecords.get(userid);
}

export function createFertilizerRecord(userid, record) {
  const records = db.fertilizerRecords.get(userid) || [];
  records.push(record);
  db.fertilizerRecords.set(userid, records);
  return record;
}

export function resetFertilizerRecords(userid) {
  db.fertilizerRecords.set(userid, []);
}

export function getFacilitiesRecords(userid) {
  if (!db.facilitiesRecords.has(userid)) db.facilitiesRecords.set(userid, []);
  return db.facilitiesRecords.get(userid);
}

export function createFacilitiesRecord(userid, record) {
  const records = db.facilitiesRecords.get(userid) || [];
  records.push(record);
  db.facilitiesRecords.set(userid, records);
  return record;
}

export function resetFacilitiesRecords(userid) {
  db.facilitiesRecords.set(userid, []);
}

export function getPersonal(userid) {
  if (!db.personal.has(userid)) db.personal.set(userid, []);
  return db.personal.get(userid);
}

export function createPersonal(userid, record) {
  const records = db.personal.get(userid) || [];
  records.push(record);
  db.personal.set(userid, records);
  return record;
}




