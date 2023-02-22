const DEFAULT_LIMIT = 0;
const DEFAULT_PAGE = 1;

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