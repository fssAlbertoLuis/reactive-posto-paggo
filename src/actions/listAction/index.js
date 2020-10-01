const changePerPage = () => {

};

function changePage(data, page, action, asyncAction, toggleLoading) {
  const total = data.list.meta.total;
  const perPage = parseInt(data.list.meta.per_page, 10);
  const list = data.list.data;
  const initialIndex = (page-1) * perPage;
  const lastIndex = initialIndex + perPage;
  return async function(dispatch) {
    if (initialIndex < total) {
      if (list[initialIndex] && list[lastIndex-1]) {
        dispatch(action(page));
      } else {
        if ((lastIndex > total && list[total-1]) || (lastIndex < total && list[lastIndex-1])) {
          dispatch(action(page));
        } else {
          dispatch(asyncAction(page, perPage, toggleLoading));
        }
      }
    }
  };
};

export const ListActions = {
  changePerPage, changePage,
};
