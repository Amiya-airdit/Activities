using ActivitiesApp from '../db/schema';

service activityService {

    entity activity {
        key name                 : String;       //Activity Type
            // applicationType      : String;
            // departmentId         : String(36);
            objectType           : String;         //Project Type
            // dependentFields      : String;
            // allocatedDepartments : String;
            // displayField         : String;
            // formzCategory        : String;
            // category             : String;
            // isVisible            : Boolean;
            createdTime          : Timestamp;
            // formType             : String;
            // type                 : String;
    }

}
