export const formatDate = (datestring) => { 
    var options = { year: 'numeric', month: 'long', day: 'numeric' , hour: 'numeric' , minute: 'numeric'};
    return new Date(datestring).toLocaleDateString([],options);
};

export function shareMyScreen() {
    return (
      window.open('mailto:?subject=Showing what im seeing&body=Hey,%0D%0ACheck this out ' + window.location.href + '', '_self')
    );
  }