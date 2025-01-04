export interface IProfile {
    id:             number;
	username:       string;
	role:           string;
	token:          string;
	tokenExpiredAt: number;
	avatar:         NullableString;
}

interface NullableString {
    Valid: string;
    String: string;
}