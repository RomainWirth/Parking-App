import { Controller, Get, Put, Param } from '@nestjs/common';
import { ParkingPlace } from './parking-place.entity';
import { ParkingService } from './parking.service';

@Controller('parking')
export class ParkingController {
  constructor(private parkingService: ParkingService) {}

  @Get()
  getAllParkingPlaces(): Promise<ParkingPlace[]> {
    return this.parkingService.getAllParkingPlaces();
  }

  @Put(':id/occupy')
  occupyParkingPlace(@Param('id') id: number): Promise<ParkingPlace> {
    return this.parkingService.occupyParkingPlace(id);
  }

  @Put(':id/vacate')
  vacateParkingPlace(@Param('id') id: number): Promise<ParkingPlace> {
    return this.parkingService.vacateParkingPlace(id);
  }
}