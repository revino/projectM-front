import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import API from "../../api/setting";

const name = 'USER'

// Initial State
const initialState = {
  isUserInfoFetching: false,
  isUserChannelFetching: false,
  isUserLoginFetching: false,
  isUserSettingFetching: false,
  isUserAlarmFetching: false,
  isUserInfo: false,
  isChannelInfo: false,
  isUserSetting: false,
  isAlarmInfo: false,
  isLogin: false,
  isError: false,
  info:{
    name: '',
    email: '',
    photo: '',
  },
  channel:{
    channelList: [],
    currentChannel: {},
  },
  setting:{
    isSlackWebHook: false,
    slackWebHookUrl: '',
  },
  alarm:{
    alarmItemList: [],
  }
};


const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state) => {
      state.isError = false;
      state.isUserLoginFetching = false;
      state.isLogin =  true;
    },
    logout: (state) => {
      state.isUserInfo = false;
      state.isChannelInfo = false;
      state.isError = false;
      state.isLogin = false;
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
      return { ...state, isError: false, isUserInfoFetching: true, isUserInfo: false, isChannelInfo: false, isUserSetting: false, isAlarmInfo:false};
    })
    builder.addCase(getUserAsync.fulfilled, (state, action) => {
      return { ...state, isError: false, isUserInfoFetching: false, isUserInfo: true, isChannelInfo: true, isUserSetting: true, isAlarmInfo: true,
                info:action.payload.user, 
                channel:action.payload.channel,
                setting:action.payload.setting,
                alarm:action.payload.alarm,
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

    //requestLogin
    builder.addCase(requestLoginAsync.pending, (state, action) => {
      return { ...state, isError: false, isUserLoginFetching: true, isLogin: false };
    })
    builder.addCase(requestLoginAsync.fulfilled, (state, action) => {
      return { ...state, isError: false, isUserLoginFetching: false, isLogin: true };
    })
    builder.addCase(requestLoginAsync.rejected, (state, action) => {
      return { ...state, isError: true,  isUserLoginFetching: false, isLogin: false};
    })

    //getUserSettingAsync
    builder.addCase(getUserSettingAsync.pending, (state, action) => {
      return { ...state, isError: false, isUserSettingFetching: true};
    })
    builder.addCase(getUserSettingAsync.fulfilled, (state, action) => {
      return { ...state, isError: false, isUserSettingFetching: false,
        setting:action.payload.setting
      };
    })
    builder.addCase(getUserSettingAsync.rejected, (state, action) => {
      return { ...state, isError: true,  isUserSettingFetching: false};
    })

    //setUserSettingAsync
    builder.addCase(setUserSettingAsync.pending, (state, action) => {
      return { ...state, isError: false, isUserSettingFetching: true, isLogin: false };
    })
    builder.addCase(setUserSettingAsync.fulfilled, (state, action) => {
      return { ...state, isError: false, isUserSettingFetching: false,
        setting:action.payload.setting
      };
    })
    builder.addCase(setUserSettingAsync.rejected, (state, action) => {
      return { ...state, isError: true,  isUserSettingFetching: false, isLogin: false};
    })

    //getAlarmAsync
    builder.addCase(getAlarmAsync.pending, (state, action) => {
      return { ...state, isError: false, isUserAlarmFetching: true};
    })
    builder.addCase(getAlarmAsync.fulfilled, (state, action) => {
      return { ...state, isError: false, isUserAlarmFetching: false,
        alarm:action.payload.alarm
      };
    })
    builder.addCase(getAlarmAsync.rejected, (state, action) => {
      return { ...state, isError: true,  isUserAlarmFetching: false};
    })

    
  }
})

export const requestLoginAsync = createAsyncThunk(`${name}/LOGIN/POST`, async (data) =>{
  const response = await API.user.requestLogin(data);

  const accessToken = response.data.data;

  if(!!accessToken) {
    localStorage.setItem("ACCESS_TOKEN", accessToken);
  } 

  return;
})

export const getAlarmAsync = createAsyncThunk(`${name}/ALARM/GET`, async () =>{
  const response = await API.user.getUserInfo();
  
  const info = {
    alarm: {
      alarmItemList : response.data.data.alarmItemList,
    }
  }

  return info;
})

export const setUserSettingAsync = createAsyncThunk(`${name}/SETTING/PUT`, async (data) =>{
  const response = await API.user.setUserSetting(data);

  const info = {
    setting: {
      isSlackWebHook: response.data.data.slackWebHook,
      slackWebHookUrl: response.data.data.slackWebHookUrl,
    }
  }
  
  return info;
})

export const getUserSettingAsync = createAsyncThunk(`${name}/SETTING/GET`, async () =>{
  const response = await API.user.getUserInfo();
  
  const info = {
    setting: {
      isSlackWebHook: response.data.data.slackWebHook,
      slackWebHookUrl: response.data.data.slackWebHookUrl 
    }
  }

  return info;
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
    },
    setting: {
      isSlackWebHook: response.data.data.slackWebHook,
      slackWebHookUrl: response.data.data.slackWebHookUrl 
    },
    alarm: {
      alarmItemList : response.data.data.alarmItemList,
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

export const { logout, login } = userSlice.actions

export default userSlice.reducer;