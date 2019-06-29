/* eslint-disable no-undef */
export let error = {

	property_404 : 
    {status:404,error:'That property type do not exist'} ,


	user_404 : 
    {status:404,error:'That user does not exist'} ,


	autthorization_401 : 
    {err:401,data:'This is a protected routes, you have to be logged in'} ,


	uniquevalue_403 : 
    { status:403, error: 'email already in use' },


	email_password_403:
    { status:403, error: 'please check your email or password' },


	reg_new_403:
    { status:403, error: 'please register a new account, that email is not registered' },


	unauthorized_post_403:
    {status:403, error:'unauthorized posting'},


	no_advert_delete_404:
    {status:404,error:'no advert to delete'},


	id_number_404:
    {status:404, error:'Id must be number'},


	failed_auth_402:
    { status:402, error: 'failed authentication' },


	label_err_403:
    {status:403,error:'field label except price (number) can only be Alphabet characters'},


	price_403:
    {status:403,err:'price Must be Floating Number, i.e 1700.00'},


	all_field_402:
    {status:402 , error: 'Please fill all field correctly' },


	empty_field_403:
    {status:403,error:'empty field'},


	input_image_403:
    {status:403,error:'please fill all input and upload an image'},


	invalid_email_402:
    { status:402, error: 'Invalid email' },


	string_err_403:
    {status:403 , error: 'first name and last name can only be string with letter characters' },


	interger_err_404:
    {status:404 , error: 'Only numbers are required in phone number and 11 digits' },


	network_err_400:
    {status:400,error: { message: 'someting went wrong while processing your request'}},


	no_ads_err_202:
    {status: 202, error: 'no advert available'},
    

};

