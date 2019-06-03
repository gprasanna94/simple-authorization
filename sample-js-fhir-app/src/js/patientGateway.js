
$(document).ready(function(){
      $('.js-updatePatientDetails').on('click', function(){
        postPatientData();
      });

      $('.js-fetchPatientDetails').on('click', function(){
        getPatientData();
      });

      let patientDataRequest = {
        serviceUrl: "https://api.hspconsortium.org/hspcdemo/open",
        patientId: "BILIBABY"
      };
      let patientDataResponse = FHIR.client(patientDataRequest);
      let  patient = patientDataResponse.patient;


      function getPatientData(){
        patientDataResponse.patient.read().then(function(patient) {
          displayPatientData (patient);
        });
      }

      function getPatientName (patient) {
          if (patient.name) {
            let names = patient.name.map(function(name) {
              return name.given.join(" ") + " " + name.family.join(" ");
            });
            return names.join(" / ");
          }

		  return "anonymous";
      }

      function displayPatientData (patient) {
        $('#patient_name').html(getPatientName(patient));
        $('#patient_gender').html(patient.gender);
        $('#patient_birthDate').html(patient.birthDate);
      }

      function postPatientData(){
        patientDataResponse.patient.read().then(function(patient) {
          postPatient(patient);
        });
      }

      function postPatient(patient) {
          let pmpUrl = 'https://jsonplaceholder.typicode.com/posts';
        let data = {
			title:patient.gender,
			body:patient.birthDate
		};

        $.post(pmpUrl, data, function(data, status){
          alert(`status is ${status}`);
        });
      }
  })
