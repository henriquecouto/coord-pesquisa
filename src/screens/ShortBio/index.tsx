import React, { useEffect } from "react";
import { useSnackbar } from "notistack";
import { UserActions } from "../../redux/user/user.ducks";
import { useDispatch, useSelector } from "react-redux";
import IGlobalState from "../../redux/definitions/GlobalState";
import ShortBioForm from "../../components/ShortBioForm";

const ShortBio: React.FC = () => {
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const shortBio = useSelector(
    (state: IGlobalState) => state.userReducer.shortBio
  );
  const loading = useSelector(
    (state: IGlobalState) => state.userReducer.loading
  );

  const onSubmit = (data: any) => {
    dispatch(UserActions.changeShortBio(data, enqueueSnackbar));
  };

  useEffect(() => {
    dispatch(UserActions.getShortBioRequested());
  }, [dispatch]);

  if (loading) {
    return <h1>loading...</h1>;
  }

  return <ShortBioForm onSubmit={onSubmit} shortBio={shortBio} />;
};

export default ShortBio;
