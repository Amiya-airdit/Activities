namespace ActivitiesApp;


entity formviews {
    key name                 : String;
        applicationType      : String;
        departmentId         : String(36);
        objectType           : String;
        dependentFields      : String;
        allocatedDepartments : String;
        displayField         : String;
        formzCategory        : String;
        category             : String;
        isVisible            : Boolean;
        createdTime          : Timestamp;
        formType             : String;
        type                 : String;
}
