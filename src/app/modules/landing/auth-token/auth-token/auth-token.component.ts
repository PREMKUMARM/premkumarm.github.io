import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AuthTokenApiService } from '../auth-token-api.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'auth-token',
  templateUrl: './auth-token.component.html',
  encapsulation: ViewEncapsulation.None
})
export class AuthTokenComponent implements OnInit {
  accessCode: string;

  constructor(private _authTokenService: AuthTokenApiService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.queryParams
      .subscribe(params => {
        this.accessCode = params.code;
        console.log(this.accessCode);
        localStorage.removeItem('accessToken2');
        if(!localStorage.getItem('accessToken2')){
          this.generateAccessToken(this.accessCode);
        }
      }
    );
  }

  generateAccessToken(code) {
    this._authTokenService.getAccessToken(code).subscribe(res=>{
      localStorage.setItem('accessToken2', res.access_token);
      localStorage.setItem('user-data', JSON.stringify(res));
      if(res.access_token){
        this._authTokenService.setAccessToken(res.access_token).subscribe(res1=>{
          console.log(res1);
        });
      }
    });
  }

}
