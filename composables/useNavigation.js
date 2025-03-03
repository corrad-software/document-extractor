import adminNavigation from '~/navigation/admin.json'

export const useNavigation = () => {
  const getAdminNavigation = () => {
    // Here you could add logic to fetch from an API or local storage
    // to support menu editing functionality
    return adminNavigation.menu
  }

  const saveAdminNavigation = async (navigation) => {
    // This is where you would implement the logic to save
    // the updated navigation, either to an API or local storage
    console.log('Saving navigation:', navigation)
  }

  return {
    getAdminNavigation,
    saveAdminNavigation
  }
} 