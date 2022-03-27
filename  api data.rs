// api data
[
  {},
  {},
  // ...
  // all user data
]

-> use user id to filter matched data

// vuex -> getter / state
// state 
[
  // matched user data
  {
    name: "tets123123",
    age: 19
  },
  {},
  {},
  {},
]



// getter
[
  // matched user data
  {
    name: "test12312123"
  },
  {},
  {},
  {},
]

-> mapping to company names data

[
  company1,
  company2,
  company3,
  company4,
]

// action 
// api -> filtered data

state : {
  apiFilterData: [], // 4 x data

},
getters: {
  data() {
    // matched data
  }
}

[
  {id}
]