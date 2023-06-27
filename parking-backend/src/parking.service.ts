import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ParkingPlace } from './parking-place.entity';

@Injectable()
export class ParkingService {
  constructor(
    @InjectRepository(ParkingPlace)
    private parkingPlaceRepository: Repository<ParkingPlace>,
  ) {}

  getAllParkingPlaces(): Promise<ParkingPlace[]> {
    return this.parkingPlaceRepository.find();
  }

  occupyParkingPlace(id: number): Promise<ParkingPlace> {
    return this.parkingPlaceRepository.save({ id, occupied: true });
  }

  vacateParkingPlace(id: number): Promise<ParkingPlace> {
    return this.parkingPlaceRepository.save({ id, occupied: false });
  }
}