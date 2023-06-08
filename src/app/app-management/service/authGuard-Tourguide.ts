import { Injectable } from "@angular/core";
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { AppRoutingUrl } from "../app-routing.url";
import { AuthService } from "./auth.service";

@Injectable()
export class AuthGuardTourGuide implements CanActivate {
    constructor(private router: Router,private authService:AuthService) {
    }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        if (this.authService.getRole() == "ROLE-TOURGUIDE") {
            return true;
        }
        else {
            this.router.navigate([AppRoutingUrl.common.access_denied]);
            return false;

        }

    }
}