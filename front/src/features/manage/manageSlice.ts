import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { RootState } from '../../app/store';

interface ManageState {
    addRowActionClicked: boolean;
}
const initialState: ManageState = {
    addRowActionClicked: false,
};
const manageSlice = createSlice({
    name: 'manage',
    initialState,
    reducers: {
        setAddAction(state, action: PayloadAction<boolean>) {
            state.addRowActionClicked = action.payload;
        },
    },
});

export const { setAddAction } = manageSlice.actions;
export default manageSlice.reducer;

export const getManageState = (state: RootState) => state.manage;
