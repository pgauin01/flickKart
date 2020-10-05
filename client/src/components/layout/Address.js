import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteAddress } from "../../store/actions/user";
import EditAddress from "../../components/layout/editAddress";
import AddAddresScreen from "../../components/layout/addAddress";

const Address = (props) => {
  const [editadd, setEditAdd] = useState(false);
  const [addAddress, setAddAddress] = useState(false);
  const [id, SetId] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const { address } = user.credentials;
  // console.log(address.length);

  const deleteAddressHandler = (id) => {
    dispatch(deleteAddress(id));
  };

  const editAddressHandler = (id) => {
    setEditAdd(true);
    SetId(id);
  };

  const addAddressHandler = () => {
    setAddAddress(true);
  };
  let screen;
  if (address.length === 0) {
    screen = (
      <div className="add">
        <p>No address found</p>
      </div>
    );
  } else {
    screen = (
      <div className="userViewAddress__address">
        {address.map((el) => {
          return (
            <div key={el.id} className="userViewAddress__address--block">
              <div className="userViewAddress__header">
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => editAddressHandler(el.id)}
                >
                  <img src="/img/edit.png" className="userViewAddress__img" />
                </div>
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => deleteAddressHandler(el.id)}
                >
                  <img src="/img/delete.png" className="userViewAddress__img" />
                </div>
              </div>
              <h3 className="u-margin-horizontal-small">{el.user.name}</h3>
              <p className="u-margin-horizontal-small"> {el.address}</p>
            </div>
          );
        })}
      </div>
    );
  }

  if (editadd) {
    screen = <EditAddress id={id} {...props} />;
  }

  if (addAddress) {
    screen = <AddAddresScreen />;
  }

  return (
    <div className="userViewAddress">
      {addAddress ? null : (
        <button className="btn btn__address" onClick={addAddressHandler}>
          Add New Address
        </button>
      )}

      {screen}
    </div>
  );
};

export default Address;
