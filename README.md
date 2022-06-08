1. [x] create class item component which will be shown in a list on tab 1
2. [x] create a date filter
3. [x] class type filter
4. [x] show name of class type, not the ID -> in class component, write function to return classType.name that corresponds to the classTypeId
5. [x] change index.js get to find by pk and change route, then in the function input pk into route? but then how to get that into service?
6. [x] day filter not working properly when changeDate()
   1. [x] AuthGuard for class registration, profile viewing
   2. [ ] authguard complete a purchase
7. [x] create purchase tab
8. [x] receipts list page 
   1. [x] order by date newest to oldest
   2. [x] make sure only user's purchases are visible and not all (filter in index.js)
9. [ ] settings page
10. [x] order class schedule by start time
11. [ ] profile add photo
12. [ ] change membership type after a purchase
13. [x] register user for class
    1. [x] fix html registration button to have classDetails.classId and userId as inputs
14. [x] make registration button inactive if current time > class start time class detail view is authguarded
15. [x] sequelize eager loading error when trying to view name of user associated with a class reg
16. [ ] if membership is not unlimited, subtract one from punch pass with each new reg
17. [ ] change waiver signed to 1 after a waiver is signed
    - what initiates a waiver signed? prob when creating a new account
18. [ ] link class signups to calendar
19. [x] receipts page back button
20. [ ] how to view tab menu when on a non-tab page?
21. [ ] register needs to be for a specific date, not just weekday class
