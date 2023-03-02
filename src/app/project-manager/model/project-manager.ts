export class ProjectManager {

    constructor(
        public manager      :           string,
        public projects     :           string[],
        public assignee     :           string[],    
        public id?          :           string
    ){}
}