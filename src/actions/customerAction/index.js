import {customerService} from '../../api/customer';

export function searchCustomerApi(search, toggleLoading, setCustomer, setError) {
  return async function(dispatch) {
    toggleLoading();
    try {
      const res = await customerService.search(search);
      setCustomer(res);
      toggleLoading();
      return true;
    } catch (e) {
      setError('Cliente não encontrado');
      toggleLoading();
    }
  };
}
