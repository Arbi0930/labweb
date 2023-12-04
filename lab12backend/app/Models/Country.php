
namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Country extends Model
{
    protected $fillable = [
        'name',
        'country_code', // Assuming this field exists in your database table for the countries
        // Add other fillable fields as needed
    ];
}
