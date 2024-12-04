const UserResponseExample = {
  "uid": "txkaYcis6ydyBenK7L6xJUBvUJP2",
  "email": "test@test.com",
  "emailVerified": false,
  "displayName": "test test",
  "disabled": false,
  "metadata": {
    "lastSignInTime": null,
    "creationTime": "Tue, 03 Dec 2024 23:49:11 GMT",
    "lastRefreshTime": null
  },
  "tokensValidAfterTime": "Tue, 03 Dec 2024 23:49:11 GMT",
  "providerData": [
    {
      "uid": "test@test.com",
      "displayName": "test test",
      "email": "test@test.com",
      "providerId": "password"
    }
  ]
};

const SigninResponse = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJhdWQiOiJodHRwczovL2lkZW50aXR5dG9vbGtpdC5nb29nbGVhcGlzLmNvbS9nb29nbGUuaWRlbnRpdHkuaWRlbnRpdHl0b29sa2l0LnYxLklkZW50aXR5VG9vbGtpdCIsImlhdCI6MTczMzI3NDEzMCwiZXhwIjoxNzMzMjc3NzMwLCJpc3MiOiJmaXJlYmFzZS1hZG1pbnNkay1qejR1cUBkZXZvdGVsLTNlZTNhLmlhbS5nc2VydmljZWFjY291bnQuY29tIiwic3ViIjoiZmlyZWJhc2UtYWRtaW5zZGstano0dXFAZGV2b3RlbC0zZWUzYS5pYW0uZ3NlcnZpY2VhY2NvdW50LmNvbSIsInVpZCI6InR4a2FZY2lzNnlkeUJlbks3TDZ4SlVCdlVKUDIifQ.hZQKIl61NqZYvHMaQ0XkbWwBgGeZKri_MU3eRkTjtQ3WZgGVwqJxSl0JYmgOUrPb7E1vMgx50QhmzRTqWGwTe4SztZE14UByF-LRORurSpMvAjcbqtXDThHvS_ufafCM2Pd0dflhH3GtNz9F_ZjmhFkZ6UZ9UXg5w_NGIc2JOpD9JhsqqCYosmQ5PjOdXuM19liloaM_sjiEF91ztOZhAN5h8ptE-ZPHIju09SeUAtAJdGqVBTuhnJ63GFjIXLuocxiL1pQmTGIGFNPWLgZWJmxluURDutOjlnXp4tVBKIXI2XF6Z23iPK6-rtp9239dM_kati6iOf5YgnUfM9WsVg'

const UsersListResponseExample = {
  data: [UserResponseExample],
  count: 1,
};

export { UserResponseExample, UsersListResponseExample, SigninResponse };
