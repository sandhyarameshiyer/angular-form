import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, FormArray, AbstractControl } from '@angular/forms';
import { DatePipe } from '@angular/common';
@Component({
	selector: 'my-app',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
	submitted = false;
	startDate: string | null;
	endDate: string | null;
	maxDate: string | null;
	courses = ["CSE", "IT", "ECE", "EEE", "Bio-Med", "Bio-Tech", "Mechanical Engineering", "Textile Engineering", "Fashion Technology", "Production Engineering"];
	appTypes = ["Freshman", "Lateral Entry"];
	castes = ["OC","BC","MBC","SC","ST"];
	collegeForm = this.fb.group({
		fullName: new FormControl('', [
			Validators.required,
			Validators.pattern("^[a-zA-Z ]+$")
		]),

		dob: new FormControl('', [
			Validators.required,
		]),
		gender: new FormControl('', [Validators.required]),
		maritalStatus: new FormControl('', [Validators.required]),
		caste: new FormControl('', [Validators.required]),
		address: this.fb.group({
			streetLine1: new FormControl('', [Validators.required]),
			streetLine2: new FormControl(''),
			city: new FormControl('', [
				Validators.required,
				Validators.pattern("^[a-zA-Z ]+$")
			]),
			state: new FormControl('', [
				Validators.required,
				Validators.pattern("^[a-zA-Z ]+$")
			]),
			zip: new FormControl('', [
				Validators.required,
				Validators.pattern("^[0-9]{6}$")
			])
		}),
		email: new FormControl('', [
			Validators.required, 
			Validators.email
		]),
		phoneNumber: new FormControl('',  [
			Validators.required,
			Validators.pattern("^[0-9]{10}$")
		]),
		education: this.fb.array([]),		
		appType: new FormControl('', [Validators.required]),
		course: new FormControl('', [Validators.required]),
		message: new FormControl('', [Validators.maxLength(600)])
	});

	get education(): FormArray {
		return this.collegeForm.get("education") as FormArray;
	}
	get f(): { [key: string]: AbstractControl }{  
		return this.collegeForm.controls;  
	  }  
	addEducation(){
		const edForm = this.fb.group({
			schoolName: new FormControl('',  [
				Validators.required,
				Validators.pattern("^[a-zA-Z .]+$")
			]),
			courseOfStudy: new FormControl('',  [
				Validators.required,
				Validators.pattern("^[a-zA-Z .]+$")
			]),
			percentile: new FormControl('',  [
				Validators.required,
				Validators.max(100)			
			]),
			startDate: new FormControl('',  [Validators.required]),
			endDate: new FormControl('',  [Validators.required])
	});
		this.education.push(edForm);
	}
	constructor(private fb: FormBuilder, public datePipe: DatePipe) {
		const dateFormat = 'yyyy-MM-dd';
    	this.startDate = datePipe.transform(
		new Date().setDate(new Date().getDate() - 1),
		dateFormat
    	);
    	this.maxDate = this.endDate = datePipe.transform(new Date(), dateFormat);
	 }
	 onDateChange(): void {
		this.startDate = this.collegeForm.get('startDate')?.value;
		this.endDate = this.collegeForm.get('endDate')?.value;
	  } 

	ngOnInit() {
		
	}

	onSubmit() {
		this.submitted = true;

        // stop here if form is invalid
        if (this.collegeForm.invalid) {
            return;
        }

        // display form values on success
        alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.collegeForm.value, null, 4));
	}
	onReset(): void {
		this.submitted = false;
		this.collegeForm.reset();
	  }
}
