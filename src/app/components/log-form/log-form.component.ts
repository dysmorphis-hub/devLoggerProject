import { Component, OnInit } from '@angular/core';
import {LogService} from "../../services/log.service";
import {Log} from "../../models/Log";

@Component({
  selector: 'app-log-form',
  templateUrl: './log-form.component.html',
  styleUrls: ['./log-form.component.css']
})
export class LogFormComponent implements OnInit {

  // @ts-ignore
  id: string;
  // @ts-ignore
  text: string;
  date: any;
  isNew: boolean = true;
  constructor(private logService:LogService) { }

  ngOnInit(): void {
    //subscribe to the selectedLog observable
    this.logService.selectedLog.subscribe(log =>{
      if(log.id !== null){
        this.isNew = false;
        this.id = log.id;
        this.text = log.text;
        this.date = log.date;
      }
    })
  }

  onSubmit(){
    //check new Log
    if (this.isNew){
      //create new log
      const newLog = {
        id: this.generateId(),
        text: this.text,
        date: new Date()
      }
      this.logService.addLog(newLog);
    }else{
      // create log to be updated
      const updLog = {
        id: this.id,
        text: this.text,
        date: new Date()
      }
      console.log(updLog);
      // update log
      this.logService.updateLog(updLog);
    }
    // clear state
    this.clearState();
  }

  clearState(){
    this.isNew = true;
    this.id = '';
    this.text = '';
    this.date = null;
    this.logService.clearState();
  }

  generateId(){
      return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = parseFloat('0.' + Math.random().toString().replace('0.', '') + new Date().getTime()) * 16 | 0,
          v = c == 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
      });
  }

}
