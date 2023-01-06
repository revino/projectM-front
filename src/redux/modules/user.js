import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/setting";

const name = 'USER'

// Initial State
const initialState = {
  isUserInfoFetching: false,
  isUserChannelFetching: false,
  isUserInfo: false,
  isChannelInfo: false,
  isError: false,
  info:{
    name: '',
    email: '',
    photo: '',
  },
  channel:{
    channelList: [],
    currentChannel: {},
  }
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    logout: (state) =>{
      state.isUserInfo = false;
      state.isChannelInfo = false;
      state.isError = false;
      state.info = {
        name: '',
        email: '',
        photo: '',
      };
      state.channel = { 
        channelList: [],
        currentChannel: {},
      };
    }
  }
  ,
  extraReducers: (builder)=>{
    //getUserAsync
    builder.addCase(getUserAsync.pending, (state, action) => {
      return { ...state, isError: false, isUserInfoFetching: true, isUserInfo: false, isChannelInfo: false};
    })
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      return { ...state, isError: false, isUserInfoFetching: false, isUserInfo: true, isChannelInfo: true,
                info:action.payload.user, 
                channel:action.payload.channel
              };
    })
    builder.addCase(getUserAsync.rejected, (state, action) => {
      return { ...state, isError: true,  isUserInfoFetching: false, isUserInfo: false, isChannelInfo: false};
    })

    //getUserChannelAsync
    builder.addCase(getUserChannelAsync.pending, (state, action) => {
      return { ...state, isError: false, isUserChannelFetching: true, isChannelInfo: false};
    })
    builder.addCase(getUserChannelAsync.fulfilled, (state, action) => {
      return { ...state, isError: false, isUserChannelFetching: false, isChannelInfo: true, 
                channel:action.payload.channel
              };
    })
    builder.addCase(getUserChannelAsync.rejected, (state, action) => {
      return { ...state, isError: true,  isUserChannelFetching: false, isChannelInfo: false};
    })
  }
})

export const getUserAsync = createAsyncThunk(`${name}/GET`, async () =>{
  const response = await API.user.getUserInfo();
  const info = {
    user: {
      name : response.data.data.nickName,
      email : response.data.data.email,
      photo : response.data.data.picture,
    },
    channel: {
      channelList : response.data.data.subscribeList,
      currentChannel : response.data.data.currentChannel,
    }
  }

  return info;
})

export const getUserChannelAsync = createAsyncThunk(`${name}_CHANNEL/GET`, async () =>{
  const response = await API.user.getUserInfo();
  const payload = {
    channel: {
      channelList : response.data.data.subscribeList,
      currentChannel : response.data.data.currentChannel,
    }
  }

  return payload;
})

export const { logout } = userSlice.actions

export default userSlice.reducer;