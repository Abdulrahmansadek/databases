1- What columns violate 1NF?
2- What entities do you recognize that could be extracted?
3- Name all the tables and columns that would make a 3NF compliant solution.

1. 'food_code' and 'food_description' .
2. 'Member' , 'dinner_id', 'venue_code','venue_description', 'food_code' .
3. we can create members_id table include 'id' , 'name'
   dinners table include 'id','date','venue_code'
   venue table include 'id','venue_description'
   food table include 'id','food_code',food_description'
   order table include 'id' , members_id foreign key , dinner_id foreign key , food_id foreign key
