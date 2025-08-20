import { Injectable } from '@angular/core';
import * as uris from '../../utilities/dominos/urls';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Proyectos } from '../../models/proyectos';
import { Tareas } from '../../models/tareas';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  public urlProyectos: string;
  public urlTareas: string;

  constructor(
    private http: HttpClient,
    private errorHandler: ErrorHandlerService
  ) { 
    this.urlProyectos = uris.PROYECTOS;
    this.urlTareas = uris.TAREAS;
  }

  // Obtener todos los proyectos
  public obtenerProyectos(): Observable<Proyectos[]> {
    return this.http.get<any[]>(this.urlProyectos).pipe(
      map(users => this.transformarUsuariosAProyectos(users)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error cargando proyectos');
        return throwError(() => error);
      })
    );
  }

  // Obtener un proyecto específico por ID
  public obtenerProyecto(id: number): Observable<Proyectos> {
    const url = `${this.urlProyectos}/${id}`;
    return this.http.get<any>(url).pipe(
      map(user => this.transformarUsuarioAProyecto(user)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error cargando proyecto ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Crear un nuevo proyecto
  public crearProyecto(proyecto: Partial<Proyectos>): Observable<Proyectos> {
    return this.http.post<any>(this.urlProyectos, proyecto).pipe(
      map(user => this.transformarUsuarioAProyecto(user)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error creando proyecto');
        return throwError(() => error);
      })
    );
  }

  // Actualizar un proyecto existente
  public actualizarProyecto(id: number, proyecto: Partial<Proyectos>): Observable<Proyectos> {
    const url = `${this.urlProyectos}/${id}`;
    return this.http.put<any>(url, proyecto).pipe(
      map(user => this.transformarUsuarioAProyecto(user)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error actualizando proyecto ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Eliminar un proyecto
  public eliminarProyecto(id: number): Observable<void> {
    const url = `${this.urlProyectos}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error eliminando proyecto ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Obtener todas las tareas
  public obtenerTareas(): Observable<Tareas[]> {
    return this.http.get<any[]>(this.urlTareas).pipe(
      map(todos => this.transformarTodosATareas(todos)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error cargando tareas');
        return throwError(() => error);
      })
    );
  }

  // Obtener tareas de un proyecto específico
  public obtenerTareasPorProyecto(projectId: number): Observable<Tareas[]> {
    const url = `${this.urlTareas}?userId=${projectId}`;
    return this.http.get<any[]>(url).pipe(
      map(todos => this.transformarTodosATareas(todos)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error cargando tareas para proyecto ${projectId}`);
        return throwError(() => error);
      })
    );
  }

  // Obtener una tarea específica por ID
  public obtenerTarea(id: number): Observable<Tareas> {
    const url = `${this.urlTareas}/${id}`;
    return this.http.get<any>(url).pipe(
      map(todo => this.transformarTodoATarea(todo)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error cargando tarea ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Crear una nueva tarea
  public crearTarea(tarea: Partial<Tareas>): Observable<Tareas> {
    return this.http.post<any>(this.urlTareas, tarea).pipe(
      map(todo => this.transformarTodoATarea(todo)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, 'Error creando tarea');
        return throwError(() => error);
      })
    );
  }

  // Actualizar una tarea existente
  public actualizarTarea(id: number, tarea: Partial<Tareas>): Observable<Tareas> {
    const url = `${this.urlTareas}/${id}`;
    return this.http.put<any>(url, tarea).pipe(
      map(todo => this.transformarTodoATarea(todo)),
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error actualizando tarea ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Eliminar una tarea
  public eliminarTarea(id: number): Observable<void> {
    const url = `${this.urlTareas}/${id}`;
    return this.http.delete<void>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        this.errorHandler.handleError(error, `Error eliminando tarea ${id}`);
        return throwError(() => error);
      })
    );
  }

  // Transformar usuarios de la API a proyectos
  private transformarUsuariosAProyectos(users: any[]): Proyectos[] {
    return users.map(user => this.transformarUsuarioAProyecto(user));
  }

  private transformarUsuarioAProyecto(user: any): Proyectos {
    return new Proyectos(
      user.id,
      user.name,
      user.username,
      user.email,
      `${user.address?.street || ''}, ${user.address?.suite || ''}, ${user.address?.city || ''}`,
      user.address?.street || '',
      user.address?.suite || '',
      user.address?.city || '',
      user.address?.zipcode || '',
      user.address?.geo?.lat || '',
      user.address?.geo?.lng || ''
    );
  }

  // Transformar todos de la API a tareas
  private transformarTodosATareas(todos: any[]): Tareas[] {
    return todos.map(todo => this.transformarTodoATarea(todo));
  }

  private transformarTodoATarea(todo: any): Tareas {
    return new Tareas(
      todo.userId,
      todo.id,
      todo.title,
      todo.completed
    );
  }
}