interface GeolocationPosition {
  latitude: number;
  longitude: number;
}

interface GeolocationError {
  code: number;
  message: string;
}

export class GeolocationService {
  private static instance: GeolocationService;
  
  static getInstance(): GeolocationService {
    if (!GeolocationService.instance) {
      GeolocationService.instance = new GeolocationService();
    }
    return GeolocationService.instance;
  }

  async getCurrentPosition(): Promise<GeolocationPosition> {
    return new Promise((resolve, reject) => {
      if (!navigator.geolocation) {
        reject(new Error('Geolocation is not supported by this browser'));
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          const geolocationError: GeolocationError = {
            code: error.code,
            message: this.getErrorMessage(error.code),
          };
          reject(geolocationError);
        },
        {
          enableHighAccuracy: false,
          timeout: 15000,
          maximumAge: 600000,
        }
      );
    });
  }

  private getErrorMessage(code: number): string {
    switch (code) {
      case 1:
        return 'Permission denied. Please allow location access.';
      case 2:
        return 'Position unavailable. Please check your connection.';
      case 3:
        return 'Request timeout. Please try again.';
      default:
        return 'An unknown error occurred.';
    }
  }

  formatCoordinates(lat: number, lon: number): string {
    return `${lat.toFixed(6)},${lon.toFixed(6)}`;
  }
}

export const geolocationService = GeolocationService.getInstance(); 