const tablesService = require("./tables.services");
const reservationService = require("../reservations/reservations.services");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {
  const data = await tablesService.list();
  res.json({
    data,
  });
}

async function create(req, res, next) {
  const { data } = req.body;
  if (data.reservation_id) {
    data.free = false;
  } else {
    data.free = data.free == false ? false : true;
  }

  const value = await tablesService.create(data);
  res.status(201).json({ data: value });
}

async function update(req, res, next) {
  const table = res.locals.table;
  const reservation = res.locals.reservation;
  const value = await tablesService.update(table, reservation);
  await reservationService.update("seated", reservation.reservation_id);
  res.json({ data: value });
}

async function destory(req, res, next) {
  const table = res.locals.table;
  const reservation = res.locals.reservation;
  // console.log(table, reservation);
  const value = await tablesService.destory(table);
  let status;

  if (reservation) {
    // console.log(reservation);
    status = await reservationService.update(
      "finished",
      reservation.reservation_id
    );
    return res.json({ data: { status } });
  }
  res.json({ data: { value } });
  // console.log(value, status);
}

//validation

async function validateIfTableForDestory(req, res, next) {
  const { table_id } = req.params;
  // console.log("table", table_id);
  const table = await tablesService.read(table_id);

  if (!table) {
    return next({ status: 404, message: `table id: ${table_id} doesnt exist` });
  }

  if (table.free) {
    return next({ status: 400, message: "table is not occupied" });
  }
  res.locals.table = table;
  next();
}

async function validateReservationIdForDelete(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next();
    // return next({ status: 400, message: "reservation data is missing" });
  } else if (!data["reservation_id"]) {
    return next({ status: 400, message: "reservation_id is missing or empty" });
  }
  const reservation = await reservationService.read(data["reservation_id"]);
  if (!reservation) {
    return next({
      status: 404,
      message: `reservation id: ${data["reservation_id"]} does not exist`,
    });
  }
  res.locals.reservation = reservation;
  next();
}

async function validateReservationIdUpdate(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({ status: 400, message: "data is missing" });
  } else if (!data["reservation_id"]) {
    return next({ status: 400, message: "reservation_id is missing or empty" });
  }
  const reservation = await reservationService.read(data["reservation_id"]);
  if (!reservation) {
    return next({
      status: 404,
      message: `reservation id: ${data["reservation_id"]} does not exist`,
    });
  }
  if (reservation.status === "seated") {
    return next({ status: 400, message: "status already seated" });
  }
  res.locals.reservation = reservation;
  next();
}

async function validateTableForUpdate(req, res, next) {
  const { table_id } = req.params;
  const reservation = res.locals.reservation;
  const table = await tablesService.read(table_id);
  if (!table) {
    return next({ status: 400, message: `table id: ${table_id} doesnt exist` });
  }
  if (!table.free) {
    return next({ status: 400, message: "table is occupied" });
  }
  if (table.capacity < reservation.people) {
    return next({
      status: 400,
      message: "table does not have sufficient capacity",
    });
  }
  res.locals.table = table;
  next();
}

function validateTableNameCreate(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({ status: 400, message: "data is missing" });
  } else if (!data["table_name"] || data["table_name"].length < 2) {
    return next({ status: 400, message: "table_name is missing or to short" });
  }
  next();
}

function validateCapacityCreate(req, res, next) {
  const { data } = req.body;
  if (!data) {
    return next({ status: 400, message: "data is missing" });
  } else if (!data["capacity"] || typeof data["capacity"] !== "number") {
    return next({
      status: 400,
      message: "capacity is missing or not a number",
    });
  }
  next();
}

module.exports = {
  list: asyncErrorBoundary(list),
  create: [
    validateTableNameCreate,
    validateCapacityCreate,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(validateReservationIdUpdate),
    asyncErrorBoundary(validateTableForUpdate),
    asyncErrorBoundary(update),
  ],
  destory: [
    asyncErrorBoundary(validateIfTableForDestory),
    asyncErrorBoundary(validateReservationIdForDelete),
    asyncErrorBoundary(destory),
  ],
};
