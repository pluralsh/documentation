/* eslint-disable */
// prettier-ignore
import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  GraphQLBigInt: any;
  GraphQLStringOrFloat: any;
  Hash: any;
  JSON: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  create_events_item?: Maybe<Events>;
  create_events_items: Array<Events>;
  delete_events_item?: Maybe<Delete_One>;
  delete_events_items?: Maybe<Delete_Many>;
  update_events_batch: Array<Events>;
  update_events_item?: Maybe<Events>;
  update_events_items: Array<Events>;
  update_site_settings?: Maybe<Site_Settings>;
};


export type MutationCreate_Events_ItemArgs = {
  data: Create_Events_Input;
};


export type MutationCreate_Events_ItemsArgs = {
  data?: InputMaybe<Array<Create_Events_Input>>;
  filter?: InputMaybe<Events_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationDelete_Events_ItemArgs = {
  id: Scalars['ID'];
};


export type MutationDelete_Events_ItemsArgs = {
  ids: Array<InputMaybe<Scalars['ID']>>;
};


export type MutationUpdate_Events_BatchArgs = {
  data?: InputMaybe<Array<Update_Events_Input>>;
  filter?: InputMaybe<Events_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Events_ItemArgs = {
  data: Update_Events_Input;
  id: Scalars['ID'];
};


export type MutationUpdate_Events_ItemsArgs = {
  data: Update_Events_Input;
  filter?: InputMaybe<Events_Filter>;
  ids: Array<InputMaybe<Scalars['ID']>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type MutationUpdate_Site_SettingsArgs = {
  data: Update_Site_Settings_Input;
};

export type Query = {
  __typename?: 'Query';
  events: Array<Events>;
  events_aggregated: Array<Events_Aggregated>;
  events_by_id?: Maybe<Events>;
  site_settings?: Maybe<Site_Settings>;
};


export type QueryEventsArgs = {
  filter?: InputMaybe<Events_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEvents_AggregatedArgs = {
  filter?: InputMaybe<Events_Filter>;
  groupBy?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type QueryEvents_By_IdArgs = {
  id: Scalars['ID'];
};

export type Boolean_Filter_Operators = {
  _eq?: InputMaybe<Scalars['Boolean']>;
  _neq?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Count_Function_Filter_Operators = {
  count?: InputMaybe<Number_Filter_Operators>;
};

export type Count_Functions = {
  __typename?: 'count_functions';
  count?: Maybe<Scalars['Int']>;
};

export type Create_Directus_Files_Input = {
  charset?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  embed?: InputMaybe<Scalars['String']>;
  filename_disk?: InputMaybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: InputMaybe<Scalars['GraphQLBigInt']>;
  folder?: InputMaybe<Create_Directus_Folders_Input>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  modified_by?: InputMaybe<Create_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']>;
  storage: Scalars['String'];
  tags?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  uploaded_by?: InputMaybe<Create_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type Create_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name: Scalars['String'];
  parent?: InputMaybe<Create_Directus_Folders_Input>;
};

export type Create_Directus_Roles_Input = {
  admin_access: Scalars['Boolean'];
  app_access?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  enforce_tfa: Scalars['Boolean'];
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name: Scalars['String'];
  users?: InputMaybe<Array<InputMaybe<Create_Directus_Users_Input>>>;
};

export type Create_Directus_Users_Input = {
  auth_data?: InputMaybe<Scalars['JSON']>;
  avatar?: InputMaybe<Create_Directus_Files_Input>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_notifications?: InputMaybe<Scalars['Boolean']>;
  external_identifier?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  language?: InputMaybe<Scalars['String']>;
  last_access?: InputMaybe<Scalars['Date']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_page?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['Hash']>;
  provider?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Create_Directus_Roles_Input>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tfa_secret?: InputMaybe<Scalars['Hash']>;
  theme?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Hash']>;
};

export type Create_Events_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['Date']>;
  fields?: InputMaybe<Scalars['JSON']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Create_Directus_Users_Input>;
  user_updated?: InputMaybe<Create_Directus_Users_Input>;
};

export type Date_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['String']>;
  _gt?: InputMaybe<Scalars['String']>;
  _gte?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _lt?: InputMaybe<Scalars['String']>;
  _lte?: InputMaybe<Scalars['String']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Datetime_Function_Filter_Operators = {
  day?: InputMaybe<Number_Filter_Operators>;
  hour?: InputMaybe<Number_Filter_Operators>;
  minute?: InputMaybe<Number_Filter_Operators>;
  month?: InputMaybe<Number_Filter_Operators>;
  second?: InputMaybe<Number_Filter_Operators>;
  week?: InputMaybe<Number_Filter_Operators>;
  weekday?: InputMaybe<Number_Filter_Operators>;
  year?: InputMaybe<Number_Filter_Operators>;
};

export type Datetime_Functions = {
  __typename?: 'datetime_functions';
  day?: Maybe<Scalars['Int']>;
  hour?: Maybe<Scalars['Int']>;
  minute?: Maybe<Scalars['Int']>;
  month?: Maybe<Scalars['Int']>;
  second?: Maybe<Scalars['Int']>;
  week?: Maybe<Scalars['Int']>;
  weekday?: Maybe<Scalars['Int']>;
  year?: Maybe<Scalars['Int']>;
};

export type Delete_Many = {
  __typename?: 'delete_many';
  ids: Array<Maybe<Scalars['ID']>>;
};

export type Delete_One = {
  __typename?: 'delete_one';
  id: Scalars['ID'];
};

export type Directus_Files = {
  __typename?: 'directus_files';
  charset?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  duration?: Maybe<Scalars['Int']>;
  embed?: Maybe<Scalars['String']>;
  filename_disk?: Maybe<Scalars['String']>;
  filename_download: Scalars['String'];
  filesize?: Maybe<Scalars['GraphQLBigInt']>;
  folder?: Maybe<Directus_Folders>;
  height?: Maybe<Scalars['Int']>;
  id: Scalars['ID'];
  location?: Maybe<Scalars['String']>;
  metadata?: Maybe<Scalars['JSON']>;
  metadata_func?: Maybe<Count_Functions>;
  modified_by?: Maybe<Directus_Users>;
  modified_on?: Maybe<Scalars['Date']>;
  modified_on_func?: Maybe<Datetime_Functions>;
  storage: Scalars['String'];
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  title?: Maybe<Scalars['String']>;
  type?: Maybe<Scalars['String']>;
  uploaded_by?: Maybe<Directus_Users>;
  uploaded_on?: Maybe<Scalars['Date']>;
  uploaded_on_func?: Maybe<Datetime_Functions>;
  width?: Maybe<Scalars['Int']>;
};


export type Directus_FilesFolderArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FilesModified_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_FilesUploaded_ByArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Files_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Files_Filter>>>;
  charset?: InputMaybe<String_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  duration?: InputMaybe<Number_Filter_Operators>;
  embed?: InputMaybe<String_Filter_Operators>;
  filename_disk?: InputMaybe<String_Filter_Operators>;
  filename_download?: InputMaybe<String_Filter_Operators>;
  filesize?: InputMaybe<Number_Filter_Operators>;
  folder?: InputMaybe<Directus_Folders_Filter>;
  height?: InputMaybe<Number_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  metadata?: InputMaybe<String_Filter_Operators>;
  metadata_func?: InputMaybe<Count_Function_Filter_Operators>;
  modified_by?: InputMaybe<Directus_Users_Filter>;
  modified_on?: InputMaybe<Date_Filter_Operators>;
  modified_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  storage?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  type?: InputMaybe<String_Filter_Operators>;
  uploaded_by?: InputMaybe<Directus_Users_Filter>;
  uploaded_on?: InputMaybe<Date_Filter_Operators>;
  uploaded_on_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  width?: InputMaybe<Number_Filter_Operators>;
};

export type Directus_Folders = {
  __typename?: 'directus_folders';
  id: Scalars['ID'];
  name: Scalars['String'];
  parent?: Maybe<Directus_Folders>;
};


export type Directus_FoldersParentArgs = {
  filter?: InputMaybe<Directus_Folders_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Folders_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Folders_Filter>>>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  parent?: InputMaybe<Directus_Folders_Filter>;
};

export type Directus_Roles = {
  __typename?: 'directus_roles';
  admin_access: Scalars['Boolean'];
  app_access?: Maybe<Scalars['Boolean']>;
  description?: Maybe<Scalars['String']>;
  enforce_tfa: Scalars['Boolean'];
  icon?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  ip_access?: Maybe<Array<Maybe<Scalars['String']>>>;
  name: Scalars['String'];
  users?: Maybe<Array<Maybe<Directus_Users>>>;
  users_func?: Maybe<Count_Functions>;
};


export type Directus_RolesUsersArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Roles_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Roles_Filter>>>;
  admin_access?: InputMaybe<Boolean_Filter_Operators>;
  app_access?: InputMaybe<Boolean_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  enforce_tfa?: InputMaybe<Boolean_Filter_Operators>;
  icon?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  ip_access?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  users?: InputMaybe<Directus_Users_Filter>;
  users_func?: InputMaybe<Count_Function_Filter_Operators>;
};

export type Directus_Users = {
  __typename?: 'directus_users';
  auth_data?: Maybe<Scalars['JSON']>;
  auth_data_func?: Maybe<Count_Functions>;
  avatar?: Maybe<Directus_Files>;
  description?: Maybe<Scalars['String']>;
  email?: Maybe<Scalars['String']>;
  email_notifications?: Maybe<Scalars['Boolean']>;
  external_identifier?: Maybe<Scalars['String']>;
  first_name?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  language?: Maybe<Scalars['String']>;
  last_access?: Maybe<Scalars['Date']>;
  last_access_func?: Maybe<Datetime_Functions>;
  last_name?: Maybe<Scalars['String']>;
  last_page?: Maybe<Scalars['String']>;
  location?: Maybe<Scalars['String']>;
  password?: Maybe<Scalars['Hash']>;
  provider?: Maybe<Scalars['String']>;
  role?: Maybe<Directus_Roles>;
  status?: Maybe<Scalars['String']>;
  tags?: Maybe<Scalars['JSON']>;
  tags_func?: Maybe<Count_Functions>;
  tfa_secret?: Maybe<Scalars['Hash']>;
  theme?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  token?: Maybe<Scalars['Hash']>;
};


export type Directus_UsersAvatarArgs = {
  filter?: InputMaybe<Directus_Files_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type Directus_UsersRoleArgs = {
  filter?: InputMaybe<Directus_Roles_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Directus_Users_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Directus_Users_Filter>>>;
  auth_data?: InputMaybe<String_Filter_Operators>;
  auth_data_func?: InputMaybe<Count_Function_Filter_Operators>;
  avatar?: InputMaybe<Directus_Files_Filter>;
  description?: InputMaybe<String_Filter_Operators>;
  email?: InputMaybe<String_Filter_Operators>;
  email_notifications?: InputMaybe<Boolean_Filter_Operators>;
  external_identifier?: InputMaybe<String_Filter_Operators>;
  first_name?: InputMaybe<String_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  language?: InputMaybe<String_Filter_Operators>;
  last_access?: InputMaybe<Date_Filter_Operators>;
  last_access_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  last_name?: InputMaybe<String_Filter_Operators>;
  last_page?: InputMaybe<String_Filter_Operators>;
  location?: InputMaybe<String_Filter_Operators>;
  password?: InputMaybe<Hash_Filter_Operators>;
  provider?: InputMaybe<String_Filter_Operators>;
  role?: InputMaybe<Directus_Roles_Filter>;
  status?: InputMaybe<String_Filter_Operators>;
  tags?: InputMaybe<String_Filter_Operators>;
  tags_func?: InputMaybe<Count_Function_Filter_Operators>;
  tfa_secret?: InputMaybe<Hash_Filter_Operators>;
  theme?: InputMaybe<String_Filter_Operators>;
  title?: InputMaybe<String_Filter_Operators>;
  token?: InputMaybe<Hash_Filter_Operators>;
};

export type Events = {
  __typename?: 'events';
  date_created?: Maybe<Scalars['Date']>;
  date_created_func?: Maybe<Datetime_Functions>;
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  description?: Maybe<Scalars['String']>;
  end_date?: Maybe<Scalars['Date']>;
  end_date_func?: Maybe<Datetime_Functions>;
  fields?: Maybe<Scalars['JSON']>;
  fields_func?: Maybe<Count_Functions>;
  id: Scalars['ID'];
  name?: Maybe<Scalars['String']>;
  sort?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['Date']>;
  start_date_func?: Maybe<Datetime_Functions>;
  status?: Maybe<Scalars['String']>;
  user_created?: Maybe<Directus_Users>;
  user_updated?: Maybe<Directus_Users>;
};


export type EventsUser_CreatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};


export type EventsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type Events_Aggregated = {
  __typename?: 'events_aggregated';
  avg?: Maybe<Events_Aggregated_Fields>;
  avgDistinct?: Maybe<Events_Aggregated_Fields>;
  count?: Maybe<Events_Aggregated_Count>;
  countAll?: Maybe<Scalars['Int']>;
  countDistinct?: Maybe<Events_Aggregated_Count>;
  group?: Maybe<Scalars['JSON']>;
  max?: Maybe<Events_Aggregated_Fields>;
  min?: Maybe<Events_Aggregated_Fields>;
  sum?: Maybe<Events_Aggregated_Fields>;
  sumDistinct?: Maybe<Events_Aggregated_Fields>;
};

export type Events_Aggregated_Count = {
  __typename?: 'events_aggregated_count';
  date_created?: Maybe<Scalars['Int']>;
  date_updated?: Maybe<Scalars['Int']>;
  description?: Maybe<Scalars['Int']>;
  end_date?: Maybe<Scalars['Int']>;
  fields?: Maybe<Scalars['Int']>;
  id?: Maybe<Scalars['Int']>;
  name?: Maybe<Scalars['Int']>;
  sort?: Maybe<Scalars['Int']>;
  start_date?: Maybe<Scalars['Int']>;
  status?: Maybe<Scalars['Int']>;
  user_created?: Maybe<Scalars['Int']>;
  user_updated?: Maybe<Scalars['Int']>;
};

export type Events_Aggregated_Fields = {
  __typename?: 'events_aggregated_fields';
  sort?: Maybe<Scalars['Float']>;
};

export type Events_Filter = {
  _and?: InputMaybe<Array<InputMaybe<Events_Filter>>>;
  _or?: InputMaybe<Array<InputMaybe<Events_Filter>>>;
  date_created?: InputMaybe<Date_Filter_Operators>;
  date_created_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  date_updated?: InputMaybe<Date_Filter_Operators>;
  date_updated_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  description?: InputMaybe<String_Filter_Operators>;
  end_date?: InputMaybe<Date_Filter_Operators>;
  end_date_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  fields?: InputMaybe<String_Filter_Operators>;
  fields_func?: InputMaybe<Count_Function_Filter_Operators>;
  id?: InputMaybe<String_Filter_Operators>;
  name?: InputMaybe<String_Filter_Operators>;
  sort?: InputMaybe<Number_Filter_Operators>;
  start_date?: InputMaybe<Date_Filter_Operators>;
  start_date_func?: InputMaybe<Datetime_Function_Filter_Operators>;
  status?: InputMaybe<String_Filter_Operators>;
  user_created?: InputMaybe<Directus_Users_Filter>;
  user_updated?: InputMaybe<Directus_Users_Filter>;
};

export type Hash_Filter_Operators = {
  _empty?: InputMaybe<Scalars['Boolean']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Number_Filter_Operators = {
  _between?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _eq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _gte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _lt?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _lte?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nbetween?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _neq?: InputMaybe<Scalars['GraphQLStringOrFloat']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['GraphQLStringOrFloat']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _null?: InputMaybe<Scalars['Boolean']>;
};

export type Site_Settings = {
  __typename?: 'site_settings';
  date_updated?: Maybe<Scalars['Date']>;
  date_updated_func?: Maybe<Datetime_Functions>;
  id: Scalars['ID'];
  user_updated?: Maybe<Directus_Users>;
};


export type Site_SettingsUser_UpdatedArgs = {
  filter?: InputMaybe<Directus_Users_Filter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  page?: InputMaybe<Scalars['Int']>;
  search?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
};

export type String_Filter_Operators = {
  _contains?: InputMaybe<Scalars['String']>;
  _empty?: InputMaybe<Scalars['Boolean']>;
  _ends_with?: InputMaybe<Scalars['String']>;
  _eq?: InputMaybe<Scalars['String']>;
  _icontains?: InputMaybe<Scalars['String']>;
  _in?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _ncontains?: InputMaybe<Scalars['String']>;
  _nempty?: InputMaybe<Scalars['Boolean']>;
  _nends_with?: InputMaybe<Scalars['String']>;
  _neq?: InputMaybe<Scalars['String']>;
  _nin?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  _nnull?: InputMaybe<Scalars['Boolean']>;
  _nstarts_with?: InputMaybe<Scalars['String']>;
  _null?: InputMaybe<Scalars['Boolean']>;
  _starts_with?: InputMaybe<Scalars['String']>;
};

export type Update_Directus_Files_Input = {
  charset?: InputMaybe<Scalars['String']>;
  description?: InputMaybe<Scalars['String']>;
  duration?: InputMaybe<Scalars['Int']>;
  embed?: InputMaybe<Scalars['String']>;
  filename_disk?: InputMaybe<Scalars['String']>;
  filename_download?: InputMaybe<Scalars['String']>;
  filesize?: InputMaybe<Scalars['GraphQLBigInt']>;
  folder?: InputMaybe<Update_Directus_Folders_Input>;
  height?: InputMaybe<Scalars['Int']>;
  id?: InputMaybe<Scalars['ID']>;
  location?: InputMaybe<Scalars['String']>;
  metadata?: InputMaybe<Scalars['JSON']>;
  modified_by?: InputMaybe<Update_Directus_Users_Input>;
  modified_on?: InputMaybe<Scalars['Date']>;
  storage?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  title?: InputMaybe<Scalars['String']>;
  type?: InputMaybe<Scalars['String']>;
  uploaded_by?: InputMaybe<Update_Directus_Users_Input>;
  uploaded_on?: InputMaybe<Scalars['Date']>;
  width?: InputMaybe<Scalars['Int']>;
};

export type Update_Directus_Folders_Input = {
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  parent?: InputMaybe<Update_Directus_Folders_Input>;
};

export type Update_Directus_Roles_Input = {
  admin_access?: InputMaybe<Scalars['Boolean']>;
  app_access?: InputMaybe<Scalars['Boolean']>;
  description?: InputMaybe<Scalars['String']>;
  enforce_tfa?: InputMaybe<Scalars['Boolean']>;
  icon?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  ip_access?: InputMaybe<Array<InputMaybe<Scalars['String']>>>;
  name?: InputMaybe<Scalars['String']>;
  users?: InputMaybe<Array<InputMaybe<Update_Directus_Users_Input>>>;
};

export type Update_Directus_Users_Input = {
  auth_data?: InputMaybe<Scalars['JSON']>;
  avatar?: InputMaybe<Update_Directus_Files_Input>;
  description?: InputMaybe<Scalars['String']>;
  email?: InputMaybe<Scalars['String']>;
  email_notifications?: InputMaybe<Scalars['Boolean']>;
  external_identifier?: InputMaybe<Scalars['String']>;
  first_name?: InputMaybe<Scalars['String']>;
  id?: InputMaybe<Scalars['ID']>;
  language?: InputMaybe<Scalars['String']>;
  last_access?: InputMaybe<Scalars['Date']>;
  last_name?: InputMaybe<Scalars['String']>;
  last_page?: InputMaybe<Scalars['String']>;
  location?: InputMaybe<Scalars['String']>;
  password?: InputMaybe<Scalars['Hash']>;
  provider?: InputMaybe<Scalars['String']>;
  role?: InputMaybe<Update_Directus_Roles_Input>;
  status?: InputMaybe<Scalars['String']>;
  tags?: InputMaybe<Scalars['JSON']>;
  tfa_secret?: InputMaybe<Scalars['Hash']>;
  theme?: InputMaybe<Scalars['String']>;
  title?: InputMaybe<Scalars['String']>;
  token?: InputMaybe<Scalars['Hash']>;
};

export type Update_Events_Input = {
  date_created?: InputMaybe<Scalars['Date']>;
  date_updated?: InputMaybe<Scalars['Date']>;
  description?: InputMaybe<Scalars['String']>;
  end_date?: InputMaybe<Scalars['Date']>;
  fields?: InputMaybe<Scalars['JSON']>;
  id?: InputMaybe<Scalars['ID']>;
  name?: InputMaybe<Scalars['String']>;
  sort?: InputMaybe<Scalars['Int']>;
  start_date?: InputMaybe<Scalars['Date']>;
  status?: InputMaybe<Scalars['String']>;
  user_created?: InputMaybe<Update_Directus_Users_Input>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type Update_Site_Settings_Input = {
  date_updated?: InputMaybe<Scalars['Date']>;
  id?: InputMaybe<Scalars['ID']>;
  user_updated?: InputMaybe<Update_Directus_Users_Input>;
};

export type EventFragment = { __typename?: 'events', id: string, name?: string | null, start_date?: any | null, end_date?: any | null, fields?: any | null };

export type EventsQueryVariables = Exact<{ [key: string]: never; }>;


export type EventsQuery = { __typename?: 'Query', events: Array<{ __typename?: 'events', id: string, name?: string | null, start_date?: any | null, end_date?: any | null, fields?: any | null }> };

export const EventFragmentDoc = gql`
    fragment Event on events {
  id
  name
  start_date
  end_date
  fields
}
    `;
export const EventsDocument = gql`
    query Events {
  events {
    ...Event
  }
}
    ${EventFragmentDoc}`;

/**
 * __useEventsQuery__
 *
 * To run a query within a React component, call `useEventsQuery` and pass it any options that fit your needs.
 * When your component renders, `useEventsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useEventsQuery({
 *   variables: {
 *   },
 * });
 */
export function useEventsQuery(baseOptions?: Apollo.QueryHookOptions<EventsQuery, EventsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
      }
export function useEventsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<EventsQuery, EventsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<EventsQuery, EventsQueryVariables>(EventsDocument, options);
        }
export type EventsQueryHookResult = ReturnType<typeof useEventsQuery>;
export type EventsLazyQueryHookResult = ReturnType<typeof useEventsLazyQuery>;
export type EventsQueryResult = Apollo.QueryResult<EventsQuery, EventsQueryVariables>;