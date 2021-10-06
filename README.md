<h1 align="center">Appointment Amnesia</h1>

<p align="center">Welcome to Appointment Amnesia: A medical tracking app to keep your thoughts in order.</p>

Log events (visit summaries, description/occurance of an issue you are monitoring, measurement), appointments, and medications. Events are charted (total events separated by severity, # of events organizable by catagory) and are searchable and sortable by category or severity. Appointments are separated into upcoming appointments and past appointments, and are organizable by category or provider. Medication information is collected from the openFDA API. Create your own categories and provider informaiton to customize how you monitor your progress. Write up your own summary so you can easily provide a consistent and complete medical history. 

## Built With
- [React](https://reactjs.org/)
- [Ruby on Rails](https://rubyonrails.org/)
- [PostgreSQL](https://www.postgresql.org/)
- [openFDA API](https://open.fda.gov/apis/)
- [Material UI](https://mui.com/)
- [date-fns](https://date-fns.org/)
- [Chart.js](https://www.chartjs.org/)

## Getting Started
Use these commands to run this project locally:
```
bundle install
npm install --prefix client

rails db:create db:migrate db:seed

rails s
npm start --prefix client
```

## Author
Elisa Shapiro
<br />[Profile](https://github.com/elisashapiro "Elisa Shapiro")
<br />[Email](mailto:elisashapiro@gmail.com?subject=AppointmentAmnesia% "Hello!")


© 2021 Elisa Shapiro