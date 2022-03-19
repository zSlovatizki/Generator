import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { actions } from "../redux/actions";
import { orderBy } from "lodash";
import { ListGroup } from "react-bootstrap";
import storeList from "./storesData.json";

function StoreList(props) {
  const dispatch = useDispatch();

  const stores = orderBy(
    useSelector((state) => state.store.dispalyStoresList),
    "storeName",
    props.orderType
  );

  useEffect(() => {
    dispatch(actions.initialStores(storeList));
  }, []);

  return (
    <>
      {stores && (
        <ListGroup variant="flush">
          {stores.map((store) => (
            <ListGroup.Item
              className="listItem"
              key={store._id}
              onClick={() => {
                dispatch(
                  actions.changeChoosenStore({
                    lat: store.latitude,
                    lon: store.longitude,
                  })
                );
              }}
            >
              <h5>{store.storeName}</h5>
              <p>{store.phone}</p>

              <p>{store.zipCode}</p>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </>
  );
}

export default StoreList;
