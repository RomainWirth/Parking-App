import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ParkingPlace } from './parking-place.entity';
import { ParkingService } from './parking.service';
import { ParkingController } from './parking.controller';

@Module({
  imports: [TypeOrmModule.forFeature([ParkingPlace])],
  providers: [ParkingService],
  controllers: [ParkingController],
})
export class ParkingModule {}