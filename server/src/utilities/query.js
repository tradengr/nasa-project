const DEFAULT_LIMIT = 50;
const DEFAULT_PAGE = 0;

function paginate(query) {
  const limit = Math.abs(query.limit) || DEFAULT_LIMIT;
  const page = Math.abs(query.page) || DEFAULT_PAGE;

  // convert page to skip value since mongo does not have nativ page
  const skip = (page - 1) * limit;

  // returns an obj
  return {
    limit,
    skip
  }
}

module.exports = {
  paginate
}