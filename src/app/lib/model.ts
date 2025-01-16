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

export interface IReview {
	id: number;
	review: string;
	created_at: string;
	user_id: number;
	username: string;
}